import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, UserStatus } from "@yucachain/shared";
import bcrypt from "bcryptjs";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";
import { normalizePhone } from "../../common/validators/phone.validator";

interface RegisterInput {
  fullName: string;
  businessName?: string;
  phone: string;
  password: string;
  role: Role;
  location?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const phone = normalizePhone(input.phone);
    const existing = await this.prisma.user.findUnique({ where: { phone } });
    if (existing) throw new ConflictException("That phone number is already registered");
    const id = `usr_${Date.now().toString(36)}`;
    const user = await this.prisma.user.create({
      data: {
        id,
        fullName: input.fullName.trim(),
        businessName: (input.businessName || input.fullName).trim(),
        phone,
        passwordHash: await bcrypt.hash(input.password, 10),
        role: input.role,
        location: input.location?.trim() || null,
        bio:
          input.role === Role.SELLER
            ? "New seller on Yucachain. Add a short note about what you grow."
            : "Buyer on Yucachain. Post what you need and your budget.",
        verified: false,
      },
      select: userSelect,
    });
    return this.tokenFor(user);
  }

  async login(input: { phone: string; password: string }) {
    const phone = normalizePhone(input.phone);
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) throw new UnauthorizedException("Phone number or password is incorrect");
    if (user.status !== UserStatus.ACTIVE) throw new UnauthorizedException("This account is suspended");
    const match = await bcrypt.compare(input.password, user.passwordHash);
    if (!match) throw new UnauthorizedException("Phone number or password is incorrect");
    const { passwordHash: _password, ...safe } = user;
    return this.tokenFor(safe);
  }

  me(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id }, select: userSelect });
  }

  private tokenFor(user: { id: string; role: string }) {
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    return { token, user };
  }
}

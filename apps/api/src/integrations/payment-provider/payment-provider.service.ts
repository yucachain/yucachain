import { Injectable } from "@nestjs/common";

export interface ChargeInput {
  amount: number;
  reference: string;
  phone: string;
}

@Injectable()
export class PaymentProviderService {
  createReference() {
    return `PAY-${Date.now().toString(36).toUpperCase()}`;
  }

  async charge(input: ChargeInput) {
    if (input.amount <= 0) {
      return { reference: input.reference, status: "FAILED" as const, amount: input.amount };
    }
    return { reference: input.reference, status: "SUCCESS" as const, amount: input.amount };
  }
}

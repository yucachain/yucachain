import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const password = bcrypt.hashSync("password123", 10);

const categories = [
  { id: "cat_roots", name: "Roots & Tubers", slug: "roots-tubers" },
  { id: "cat_veg", name: "Vegetables", slug: "vegetables" },
  { id: "cat_fruit", name: "Fruits", slug: "fruits" },
  { id: "cat_grains", name: "Grains & Seeds", slug: "grains-seeds" },
];

function user(input: {
  id: string;
  fullName: string;
  businessName: string;
  phone: string;
  role: string;
  location: string;
  bio: string;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    passwordHash: password,
    verified: false,
    rating: 0,
    reviewCount: 0,
    status: "ACTIVE",
    ...input,
  };
}

async function main() {
  await prisma.notification.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.sellerInterest.deleteMany();
  await prisma.buyerRequest.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.setting.deleteMany();

  await prisma.setting.create({
    data: {
      id: "default",
      commissionRate: 0.05,
      platformName: "Yucachain",
      supportEmail: "support@yucachain.ng",
    },
  });

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  const people = [
    user({
      id: "usr_admin",
      fullName: "Yucachain Admin",
      businessName: "Yucachain",
      phone: "08000000000",
      role: "ADMIN",
      location: "Abeokuta",
      bio: "Platform operations for Ogun State agricultural trade.",
      verified: true,
    }),
    user({
      id: "usr_drevo",
      fullName: "Drevo Farms",
      businessName: "Drevo Farms",
      phone: "08011111111",
      role: "SELLER",
      location: "Abeokuta",
      bio: "We grow and supply fresh cassava, yam and maize, ensuring prompt dispatch within 24 hours of harvest.",
      verified: true,
      rating: 4.5,
      reviewCount: 20,
    }),
    user({
      id: "usr_penpal_farms",
      fullName: "Penpal Farms",
      businessName: "Penpal Farms",
      phone: "08022222222",
      role: "BUYER",
      location: "Mowe",
      bio: "We buy cassava, yam and maize for processing, with clear delivery windows across Ogun State.",
      verified: true,
      rating: 4.6,
      reviewCount: 12,
    }),
    user({
      id: "usr_pee5ive",
      fullName: "Pee5ive Harvest",
      businessName: "Pee5ive Harvest",
      phone: "08033333301",
      role: "SELLER",
      location: "Abeokuta",
      bio: "Vegetables and cassava harvested for same-week dispatch from Abeokuta.",
      verified: true,
      rating: 4.7,
      reviewCount: 31,
    }),
    user({
      id: "usr_penpal_agri",
      fullName: "Penpal Agritech",
      businessName: "Penpal Agritech",
      phone: "08033333302",
      role: "SELLER",
      location: "Mowe",
      bio: "Onion and dry-season vegetables packed for market buyers.",
      verified: true,
      rating: 4.4,
      reviewCount: 16,
    }),
    user({
      id: "usr_greenhill",
      fullName: "Greenhill Farms",
      businessName: "Greenhill Farms",
      phone: "08033333303",
      role: "SELLER",
      location: "Abeokuta",
      bio: "Fruit growers supplying watermelon and seasonal baskets.",
      verified: true,
      rating: 4.3,
      reviewCount: 9,
    }),
    user({
      id: "usr_agbeloba",
      fullName: "Agbeloba Farms",
      businessName: "Agbeloba Farms",
      phone: "08033333304",
      role: "SELLER",
      location: "Mowe",
      bio: "Plantain bunches graded and ready for processors.",
      verified: true,
      rating: 4.6,
      reviewCount: 14,
    }),
    user({
      id: "usr_agrolink",
      fullName: "AgroLink Produce",
      businessName: "AgroLink Produce",
      phone: "08033333305",
      role: "SELLER",
      location: "Abeokuta",
      bio: "Cassava aggregation for food processors across the southwest.",
      verified: true,
      rating: 4.2,
      reviewCount: 11,
    }),
    user({
      id: "usr_drevo_agro",
      fullName: "Drevo Agrotech",
      businessName: "Drevo Agrotech",
      phone: "08033333306",
      role: "SELLER",
      location: "Mowe",
      bio: "Cashew and cash-crop lots with documented bag counts.",
      verified: true,
      rating: 4.5,
      reviewCount: 8,
    }),
    user({
      id: "usr_zagadat",
      fullName: "Zagadat Farms",
      businessName: "Zagadat Farms",
      phone: "08033333307",
      role: "SELLER",
      location: "Abeokuta",
      bio: "Plantain and beans supplied to processors and markets.",
      verified: true,
      rating: 4.4,
      reviewCount: 18,
    }),
    user({
      id: "usr_finale",
      fullName: "Finale Agrotech",
      businessName: "Finale Agrotech",
      phone: "08033333308",
      role: "SELLER",
      location: "Mowe",
      bio: "Grade A cassava tubers aggregated for industrial buyers.",
      verified: true,
      rating: 4.8,
      reviewCount: 22,
    }),
    user({
      id: "usr_penpal_foods",
      fullName: "Penpal Foods",
      businessName: "Penpal Foods",
      phone: "08044444401",
      role: "BUYER",
      location: "Abeokuta",
      bio: "Food processor buying cassava in tonne lots.",
      verified: true,
    }),
    user({
      id: "usr_easynation",
      fullName: "EasyNation Foods",
      businessName: "EasyNation Foods",
      phone: "08044444402",
      role: "BUYER",
      location: "Ilorin",
      bio: "Procurement desk for cassava moving into Ilorin.",
      verified: true,
    }),
    user({
      id: "usr_ripeery",
      fullName: "Ripeery Foods",
      businessName: "Ripeery Foods",
      phone: "08044444403",
      role: "BUYER",
      location: "Lagos",
      bio: "Buys onions and fresh vegetables for Lagos distribution.",
      verified: true,
    }),
    user({
      id: "usr_chips",
      fullName: "chips Factory",
      businessName: "chips Factory",
      phone: "08044444404",
      role: "BUYER",
      location: "Abeokuta",
      bio: "Plantain processor sourcing bunches inside Abeokuta.",
      verified: false,
    }),
  ];

  for (const person of people) {
    await prisma.user.create({ data: person });
  }

  const products = [
    product("prd_cassava_pee5ive", "usr_pee5ive", "cat_roots", "Fresh Cassava", 23000, "bundle", 1000, "Abeokuta", "This week", "cassava", "Freshly lifted cassava bundles, sorted for market and processing."),
    product("prd_onions", "usr_penpal_agri", "cat_veg", "Red Onions", 22000, "bag", 200, "Mowe", "2 days ago", "onion", "Dry red onions bagged for transport to Lagos and Abeokuta."),
    product("prd_carrots", "usr_pee5ive", "cat_veg", "Fresh Carrots", 15000, "bag", 300, "Abeokuta", "Today", "carrot", "Crunchy carrots washed and bagged the morning of listing."),
    product("prd_melon", "usr_greenhill", "cat_fruit", "Fresh Watermelon", 33000, "basket", 20, "Abeokuta", "Yesterday", "watermelon", "Ripe watermelons packed in market baskets."),
    product("prd_plantain", "usr_agbeloba", "cat_fruit", "Ripe Plantain", 12000, "bunch", 200, "Mowe", "Today", "plantain", "Ripe plantain bunches ready for chips and household buyers."),
    product("prd_cassava_agro", "usr_agrolink", "cat_roots", "Fresh Cassava", 21000, "bundle", 900, "Abeokuta", "This week", "cassava", "Bulk cassava bundles from aggregated Abeokuta farms."),
    product("prd_tomatoes", "usr_pee5ive", "cat_veg", "Fresh Tomatoes", 20000, "basket", 30, "Abeokuta", "Today", "tomato", "Firm tomatoes picked for same-day movement."),
    product("prd_cashew", "usr_drevo_agro", "cat_grains", "Cashew Seeds", 12000, "bag", 1200, "Mowe", "This week", "cashew", "Dried cashew seed bags, counted and sealed."),
    product("prd_peppers", "usr_pee5ive", "cat_veg", "Bell Peppers", 18000, "basket", 45, "Abeokuta", "Today", "pepper", "Green bell peppers in ventilated baskets."),
    product("prd_cassava_drevo", "usr_drevo", "cat_roots", "Cassava", 20000, "tonne", 300, "Abeokuta", "Today", "cassava", "Tonne lots of cassava with harvest-day dispatch."),
    product("prd_yam_drevo", "usr_drevo", "cat_roots", "White Yam", 18000, "tuber", 150, "Abeokuta", "Yesterday", "yam", "White yam tubers graded for household and trader buyers."),
    product("prd_maize_drevo", "usr_drevo", "cat_grains", "Yellow Maize", 16000, "bag", 80, "Abeokuta", "This week", "maize", "Dried yellow maize bagged on farm."),
    product("prd_plantain_zagadat", "usr_zagadat", "cat_fruit", "Unripe Plantain", 10000, "bunch", 400, "Abeokuta", "12 Nov", "plantain", "Green plantain for processors."),
    product("prd_cassava_finale", "usr_finale", "cat_roots", "Grade A Cassava", 10000, "tonne", 200, "Mowe", "22 Nov", "cassava", "Grade A cassava positioned for industrial offtake."),
    product("prd_beans", "usr_zagadat", "cat_grains", "Brown Beans", 70000, "bag", 240, "Abeokuta", "23 Nov", "beans", "Clean brown beans in standard bags."),
  ];

  for (const [index, item] of products.entries()) {
    await prisma.product.create({
      data: { ...item, createdAt: new Date(Date.now() - index * 60_000) },
    });
  }

  const requests = [
    request("req_cassava_mowe", "usr_penpal_farms", "Cassava", 10, "tonne", "Mowe Ibafo", 35000, "a week", "Open procurement for processing stock."),
    request("req_tomatoes", "usr_penpal_farms", "Tomatoes", 30, "basket", "Central Market", 30000, "3 days", "Needed for a weekend market run."),
    request("req_maize", "usr_penpal_farms", "White maize", 60, "bag", "Abeokuta", 15000, "2 weeks", "Dry maize, clean and bagged."),
    request("req_beans_note", "usr_penpal_farms", "Brown beans", 20, "bag", "Mowe", 65000, "10 days", "Sample lot before a larger buy."),
    request("req_cassava_ilorin", "usr_easynation", "Fresh Cassava", 10, "tonne", "Ilorin", 36000, "Within 7 days", "Delivery into Ilorin, buyer collects on arrival."),
    request("req_onions_lagos", "usr_ripeery", "Red Onions", 100, "bag", "Lagos", 24000, "Within 3 days", "Firm bulbs only."),
    request("req_plantain_abk", "usr_chips", "Plantains", 500, "bunch", "Abeokuta", 11000, "Within 5 days", "Green to turning, for chips."),
  ];

  for (const item of requests) {
    await prisma.buyerRequest.create({ data: item });
  }

  await prisma.sellerInterest.create({
    data: {
      requestId: "req_cassava_ilorin",
      sellerId: "usr_drevo",
      message: "We can move 10 tonnes of today's harvest toward Ilorin within the week.",
      price: 34000,
      status: "PENDING",
    },
  });

  const bank = await prisma.bankAccount.create({
    data: {
      userId: "usr_drevo",
      bankName: "GTBank",
      accountName: "Drevo Farms",
      accountNumber: "0123456789",
      verified: true,
    },
  });

  await prisma.bankAccount.create({
    data: {
      userId: "usr_pee5ive",
      bankName: "Access Bank",
      accountName: "Pee5ive Harvest",
      accountNumber: "2233445566",
      verified: false,
    },
  });

  await createOrder({
    id: "ord_penpal_foods_cassava",
    code: "YC-241112",
    buyerId: "usr_penpal_foods",
    sellerId: "usr_drevo",
    productId: "prd_cassava_drevo",
    name: "Cassava",
    quantity: 2,
    unit: "tonne",
    unitPrice: 100000,
    destination: "Abeokuta",
    status: "DELIVERED",
    payment: "PAID",
    delivery: "DELIVERED",
    createdAt: new Date("2026-11-12T09:00:00.000Z"),
  });

  await createOrder({
    id: "ord_plantain_purchase",
    code: "YC-241112-B",
    buyerId: "usr_penpal_farms",
    sellerId: "usr_zagadat",
    productId: "prd_plantain_zagadat",
    name: "Unripe plantain",
    quantity: 80,
    unit: "bunch",
    unitPrice: 10000,
    destination: "Mowe",
    status: "DELIVERED",
    payment: "PAID",
    delivery: "DELIVERED",
    createdAt: new Date("2026-11-12T11:30:00.000Z"),
  });

  await createOrder({
    id: "ord_cassava_transit",
    code: "YC-241122",
    buyerId: "usr_penpal_farms",
    sellerId: "usr_finale",
    productId: "prd_cassava_finale",
    name: "Grade A cassava",
    quantity: 40,
    unit: "tonne",
    unitPrice: 10000,
    destination: "Mowe",
    status: "IN_TRANSIT",
    payment: "PAID",
    delivery: "IN_TRANSIT",
    createdAt: new Date("2026-11-22T08:15:00.000Z"),
  });

  await createOrder({
    id: "ord_beans",
    code: "YC-241123",
    buyerId: "usr_penpal_farms",
    sellerId: "usr_zagadat",
    productId: "prd_beans",
    name: "Brown beans",
    quantity: 80,
    unit: "bag",
    unitPrice: 70000,
    destination: "Mowe",
    status: "DELIVERED",
    payment: "PAID",
    delivery: "DELIVERED",
    createdAt: new Date("2026-11-23T14:00:00.000Z"),
  });

  await createOrder({
    id: "ord_drevo_open",
    code: "YC-241124",
    buyerId: "usr_penpal_foods",
    sellerId: "usr_drevo",
    productId: "prd_yam_drevo",
    name: "White Yam",
    quantity: 20,
    unit: "tuber",
    unitPrice: 18000,
    destination: "Abeokuta",
    status: "CONFIRMED",
    payment: "PAID",
    delivery: "PREPARING",
    createdAt: new Date("2026-11-24T10:00:00.000Z"),
  });

  await prisma.payout.create({
    data: {
      sellerId: "usr_drevo",
      bankAccountId: bank.id,
      amount: 190000,
      status: "PAID",
      note: "Cassava sale YC-241112",
      createdAt: new Date("2026-11-13T10:00:00.000Z"),
      decidedAt: new Date("2026-11-14T10:00:00.000Z"),
    },
  });

  await prisma.payout.create({
    data: {
      sellerId: "usr_zagadat",
      amount: 500000,
      status: "PENDING",
      note: "November plantain settlement",
      createdAt: new Date("2026-11-24T16:00:00.000Z"),
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: "usr_drevo",
        title: "Sale delivered",
        body: "Penpal Foods received 2 tonnes of cassava. Order YC-241112 is delivered.",
        read: true,
      },
      {
        userId: "usr_penpal_farms",
        title: "Shipment moving",
        body: "Grade A cassava from Finale Agrotech is in transit.",
        read: false,
      },
      {
        userId: "usr_easynation",
        title: "A seller responded",
        body: "Drevo Farms expressed interest in your cassava request to Ilorin.",
        read: false,
      },
    ],
  });
}

function product(
  id: string,
  sellerId: string,
  categoryId: string,
  name: string,
  price: number,
  unit: string,
  quantity: number,
  location: string,
  harvestTime: string,
  image: string,
  description: string,
) {
  return {
    id,
    sellerId,
    categoryId,
    name,
    price,
    unit,
    quantity,
    location,
    harvestTime,
    image: `/images/products/${image}.jpg`,
    description,
    status: "ACTIVE",
  };
}

function request(
  id: string,
  buyerId: string,
  produce: string,
  quantity: number,
  unit: string,
  destination: string,
  budget: number,
  neededIn: string,
  notes: string,
) {
  return { id, buyerId, produce, quantity, unit, destination, budget, neededIn, notes, status: "OPEN" };
}

async function createOrder(input: {
  id: string;
  code: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  destination: string;
  status: string;
  payment: string;
  delivery: string;
  createdAt: Date;
}) {
  const subtotal = input.quantity * input.unitPrice;
  const fee = Math.round(subtotal * 0.05);
  await prisma.order.create({
    data: {
      id: input.id,
      code: input.code,
      buyerId: input.buyerId,
      sellerId: input.sellerId,
      status: input.status,
      subtotal,
      fee,
      total: subtotal,
      destination: input.destination,
      createdAt: input.createdAt,
      items: {
        create: {
          productId: input.productId,
          name: input.name,
          quantity: input.quantity,
          unit: input.unit,
          unitPrice: input.unitPrice,
        },
      },
      payment: {
        create: {
          amount: subtotal,
          status: input.payment,
          method: "TRANSFER",
          reference: `PAY-${input.code}`,
          paidAt: input.payment === "PAID" ? input.createdAt : null,
        },
      },
      delivery: {
        create: {
          status: input.delivery,
          address: input.destination,
        },
      },
      commission: {
        create: {
          rate: 0.05,
          amount: fee,
          status: input.payment === "PAID" ? "ACCRUED" : "PENDING",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

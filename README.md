# Yucachain

Agricultural marketplace for Ogun State. Farmers list produce, buyers post what they need, and orders move through payment, delivery, commission and payout.

The web app is **Next.js**. The API follows the module layout in `apps/api` and is **NestJS** with Prisma. Data is stored in SQLite so the project runs without a separate database server.

## Run it

```bash
pnpm install
pnpm db:setup
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/api/v1/health

## Demo accounts

Password for each account is `password123`.

| Role | Name | Phone |
| --- | --- | --- |
| Seller | Drevo Farms | 08011111111 |
| Buyer | Penpal Farms | 08022222222 |
| Admin | Yucachain Admin | 08000000000 |

The sign-in screen can fill these in.

## What is included

- Public landing, marketplace, product pages and buyer requests
- Buyer cart, checkout, mock payment, orders and procurement requests
- Seller listings, stock, sales, bank details and payout requests
- Admin users, farmers, buyers, products, orders, payments, commissions, payouts, bank verification and the commission rate

Checkout creates one order per farm. Confirming payment reduces stock and records a 5% commission. Seller payouts are available after an order is delivered, then an admin approves them.

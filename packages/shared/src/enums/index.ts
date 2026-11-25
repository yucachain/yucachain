export enum Role {
  BUYER = "BUYER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  SOLD_OUT = "SOLD_OUT",
}

export enum RequestStatus {
  OPEN = "OPEN",
  FULFILLED = "FULFILLED",
  CLOSED = "CLOSED",
}

export enum InterestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum OrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  CONFIRMED = "CONFIRMED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum CommissionStatus {
  PENDING = "PENDING",
  ACCRUED = "ACCRUED",
  SETTLED = "SETTLED",
}

export enum PayoutStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  PAID = "PAID",
  REJECTED = "REJECTED",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface PublicUser {
  id: string;
  fullName: string;
  businessName: string | null;
  phone: string;
  role: string;
  location: string | null;
  bio: string | null;
  verified: boolean;
  rating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductSeller {
  id: string;
  fullName: string;
  businessName: string | null;
  location: string | null;
  verified: boolean;
  rating: number;
  reviewCount: number;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  harvestTime: string | null;
  image: string | null;
  status: string;
  createdAt: string;
  category: Category;
  seller: ProductSeller;
}

export interface BuyerRequest {
  id: string;
  produce: string;
  quantity: number;
  unit: string;
  destination: string;
  budget: number;
  neededIn: string;
  notes: string | null;
  status: string;
  createdAt: string;
  buyer: PublicUser;
  interests?: SellerInterest[];
}

export interface SellerInterest {
  id: string;
  message: string | null;
  price: number | null;
  status: string;
  createdAt: string;
  seller: PublicUser;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  productId: string | null;
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string;
  reference: string;
  createdAt: string;
  paidAt: string | null;
}

export interface Delivery {
  id: string;
  status: string;
  address: string | null;
  updatedAt: string;
}

export interface Commission {
  id: string;
  rate: number;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Order {
  id: string;
  code: string;
  status: string;
  subtotal: number;
  fee: number;
  total: number;
  destination: string | null;
  createdAt: string;
  buyer: PublicUser;
  seller: PublicUser;
  items: OrderItem[];
  payment: Payment | null;
  delivery: Delivery | null;
  commission: Commission | null;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  verified: boolean;
  createdAt: string;
  user?: PublicUser;
}

export interface Payout {
  id: string;
  amount: number;
  status: string;
  note: string | null;
  createdAt: string;
  decidedAt: string | null;
  seller: PublicUser;
  bankAccount: BankAccount | null;
}

export interface AuthResponse {
  token: string;
  user: PublicUser;
}

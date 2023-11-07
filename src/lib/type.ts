export interface Document {
  id: number;
  user: string;
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  city: string;
  orderDate: string; // Or use Date type if you'll be converting the string to a Date object
  items: Item[];
  status: "shipped" | "delivered"; // Enumerate possible values if known
  total: number;
  updatedAt: string; // Or use Date type if you'll be converting the string to a Date object
  createdAt: string; // Or use Date type if you'll be converting the string to a Date object
}

export interface Item {
  _order: number;
  id: string;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  variations: Variation[];
  fabric: string;
  category: Category;
  subCategory: SubCategory;
  images: Image[];
  updatedAt: string; // Or use Date type if you'll be converting the string to a Date object
  createdAt: string; // Or use Date type if you'll be converting the string to a Date object
}

export interface Variation {
  _order: number;
  id: string;
  size: "m" | "l"; // Enumerate possible values if known
  color: string;
  stock: number;
}

export interface Category {
  id: number;
  title: string;
  updatedAt: string; // Or use Date type if you'll be converting the string to a Date object
  createdAt: string; // Or use Date type if you'll be converting the string to a Date object
}

export interface SubCategory {
  id: number;
  title: string;
  updatedAt: string; // Or use Date type if you'll be converting the string to a Date object
  createdAt: string; // Or use Date type if you'll be converting the string to a Date object
}

export interface Image {
  _order: number;
  id: string;
  imageUrl: string;
  altText: string;
}

export interface RootObject {
  docs: Document[];
}

export interface Document {
  quantity: number;
  variationId: any;
  product: any;
  id: number;
  user: string;
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  city: string;
  orderDate: string;
  items: Item[];
  status: "shipped" | "delivered";
  total: number;
  updatedAt: string;
  createdAt: string;
}

export interface Item {
  variationId: number;
  _order: number;
  id: string;
  quantity: number;
  product: Product;
}

export interface Fabrics {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
export interface Product {
  gender: string;
  id: number;
  title: string;
  description: string;
  price: number;
  variations: Variation[];
  fabric: Fabrics;
  category: Category;
  subCategory: SubCategory;
  images: Image[];
  updatedAt: string;
  createdAt: string;
}

export interface Colors {
  Color: any;
  id: number;
  title: string;
  hex: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export interface Fabrics {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export interface Size {
  Size: any;
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export interface Variation {
  _order: number;
  id: string;
  size: Size;
  fabric: Fabrics;
  color: Colors;
  stock: number;
}

export interface Category {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export interface SubCategory {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
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

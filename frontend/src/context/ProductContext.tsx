// src/context/ProductContext.tsx

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string; 
  created_at?: string;
  user_id: number; 
  seller_id: number;         
  seller_nickname: string;    
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  refreshProducts: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  refreshProducts: () => {}
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  
  const fetchProducts = () => {
    axios.get("http://localhost:3001/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("상품 불러오기 실패:", err));
  };

  

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, refreshProducts: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

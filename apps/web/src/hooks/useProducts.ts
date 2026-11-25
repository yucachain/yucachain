"use client";

import { useEffect, useState } from "react";
import type { Product } from "@yucachain/shared";
import { productService, type ProductQuery } from "@/services/product.service";

export function useProducts(query: ProductQuery) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const key = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    setLoading(true);
    productService
      .list(JSON.parse(key) as ProductQuery)
      .then((rows) => {
        if (active) setProducts(rows);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [key]);

  return { products, loading, error };
}

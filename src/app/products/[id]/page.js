"use client";
import { useEffect, useState } from "react";

const getData = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  return await res.json();
};

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      const { id: resolvedId } = await params;
      setId(resolvedId);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const data = await getData(id);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-container">
      <h1 className="product-title">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        width={300}
        height={300}
      />
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
    </div>
  );
};

export default ProductPage;

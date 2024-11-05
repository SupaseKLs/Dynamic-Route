// app/page.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const getData = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  
  const data = await res.json();
  return data; 
};

export default function Home() {
  const phrase = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }} // สถานะเริ่มต้น
      animate={{ opacity: 1 }} // สถานะเมื่อแสดง
      exit={{ opacity: 0 }} // สถานะเมื่อออก
      transition={{ duration: 0.5 }} // เวลาสำหรับการเปลี่ยน
    >
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} width={100} height={100} />
            </Link>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

    </motion.div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router";
// import productImg from "../assets/images/product-1.jpg";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  stock: number;
  tag_id: number;
};

export default function ProductDisplay() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await fetch("http://localhost:3310/api/products");
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProduct();
  }, []);

  // console.log(products)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mt-15 mb-20 text-center ">
        Tous les produits
      </h1>

      <div className="flex flex-wrap justify-center ">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="mb-20 mx-3.5 md:mx-0"
          >
            <img
              src={product.image_url}
              alt="product-1"
              className="w-100  h-140 object-cover"
            />
            <div className="mt-4 max-w-90 ">
              <h3 className="font-bold font-serif text-xl  ">
                {" "}
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm">{product.description} </p>
              <p className="font-bold mt-2">{product.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

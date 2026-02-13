import { useEffect, useState } from "react";
import productImg from "../assets/images/product-1.jpg";

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
        const result = response.json();
        setProducts(await result);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProduct();
  }, []);

  // console.log(products)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Tous les produits</h1>

      <div className="flex flex-wrap  justify-center ">
        {products.map((product) => (
          <div key={product.id} className="mb-20 mx-3.5 md:mx-0   ">
            <img src={productImg} alt="product-1" className="w-100  h-140  " />
            <div className="mt-4 max-w-100 px-3">
              <h3 className="font-bold mb-4"> {product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description} </p>
              <div className="flex justify-between items-center my-2 ">
                <p className="font-semibold mt-2">{product.price} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  stock: number;
  tag_id: number;
};

export async function productLoader({ params }: LoaderFunctionArgs) {
  const response = await fetch(
    `http://localhost:3310/api/products/${params.id}`,
  );
  if (!response.ok) {
    throw new Response("Produit non trouvé", { status: 404 });
  }
  return response;
}

export default function ProductDetails() {
  const product = useLoaderData() as Product;

  const handleAddToCart = () => {
    const rawData: string = localStorage.getItem("cart") ?? "[]";
    const existingCart: Product[] = JSON.parse(rawData);

    const isAlreadyInCart = existingCart.find((item) => item.id === product.id);

    if (isAlreadyInCart) {
      alert("Déjà dans le panier !");
    } else {
      const updatedCart = [...existingCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert("Ajouté !");
    }
  };

  return (
    <div className="min-h-screen bg-white py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2 transition"
        >
          ← Retour aux produits
        </Link>
      </div>
      <div className=" p-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="group overflow-hidden rounded-3xl bg-gray-100">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-125 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col h-full">
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  {product.name}
                </h1>
                <span className="bg-zinc-300 text-zinc-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {product.stock > 0 ? "En stock" : "Rupture"}
                </span>
              </div>
              <p className="text-2xl font-medium text-gray-900">
                {product.price} €
              </p>
            </div>

            <div className="py-8 bg-white p-5 rounded-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                Description
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                {product.description ||
                  "Aucune description disponible pour ce produit d'exception."}
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center border border-gray-200 w-max rounded-lg">
                <button type="button" className="px-4 py-2 hover:bg-gray-50">
                  -
                </button>
                <span className="px-4 py-2 font-medium border-x border-gray-200">
                  1
                </span>
                <button type="button" className="px-4 py-2 hover:bg-gray-50">
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 ${
                  product.stock > 0
                    ? "bg-black hover:bg-zinc-800 shadow-xl"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {product.stock > 0 ? "Ajouter au panier" : "Indisponible"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

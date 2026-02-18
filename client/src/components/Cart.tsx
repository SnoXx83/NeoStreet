import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Product } from "./ProductDetails";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const rawData = localStorage.getItem("cart") ?? "[]";
    setCartItems(JSON.parse(rawData));
  }, []);

  const removeFromCart = (id: number) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number.parseFloat(item.price),
    0,
  );

  return (
    <div className="min-h-screen bg-white py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2 transition"
          >
            ← Continuer mes achats
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Mon Panier
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg mb-6">
              Votre panier est tristement vide...
            </p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 transition"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl bg-gray-50"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg mb-2">{item.price} €</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <span className="text-gray-500 font-medium">Sous-total</span>
                <span className="text-xl font-bold">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="flex-1 py-4 px-6 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-white transition"
                >
                  Vider le panier
                </button>
                <button
                  type="button"
                  className="flex-2 py-4 px-6 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 shadow-xl transition transform active:scale-95"
                >
                  Passer la commande
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

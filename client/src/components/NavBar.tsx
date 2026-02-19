import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../assets/images/NeoStreet.png";
import { useAuth } from "./Auth/AuthForm";

export default function NavBar() {
  const { logout, isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const updateCartCount = () => {
    const rawData = localStorage.getItem("cart") ?? "[]";
    const cart = JSON.parse(rawData);
    setCartCount(cart.length);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className="bg-black text-white">
      <div className="flex justify-around items-center py-2">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="max-h-25" />
        </Link>

        <div className="flex font-semibold text-center items-center gap-6">
          <div className="flex gap-4 border-r border-zinc-800 pr-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to={"/Sign-in"}
                  className="hover:text-zinc-400 transition"
                >
                  Se connecter
                </Link>
                <Link
                  to={"/Sign-up"}
                  className="hover:text-zinc-400 transition"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          <Link
            to={"/panier"}
            className="relative group flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="text-sm">Mon panier</span>
            {cartCount > 0 && (
              <span className="bg-white text-black group-hover:bg-black group-hover:text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transition-colors">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

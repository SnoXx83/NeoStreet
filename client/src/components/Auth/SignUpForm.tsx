import { Link } from "react-router";

export default function SignUpForm() {
  return (
    <div className="flex justify-center mt-20 px-2">
      <form className="w-full max-w-md bg-black p-8 rounded-2xl shadow-2xl my-10 border border-gray-800">
        <h1 className="text-center text-2xl font-extrabold mb-8 text-white tracking-tight">
          INSCRIPTION
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full bg-white text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
              type="text"
              name="lastname"
              placeholder="Nom"
              required
            />
            <input
              className="w-full bg-white text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
              type="text"
              name="firstname"
              placeholder="Prénom"
              required
            />
          </div>

          <input
            className="w-full bg-white text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="email"
            name="email"
            placeholder="Adresse Email"
            required
          />

          <input
            className="w-full bg-white text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
          />
          <input
            className="w-full bg-white text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>

        <button
          type="button"
          className="w-full mt-8 bg-white text-black font-bold py-3 rounded-lg border-2 border-white
          hover:bg-black hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
        >
          Créer un compte
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          Déjà un compte ?{" "}
          <Link
            to="/Sign-in"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}

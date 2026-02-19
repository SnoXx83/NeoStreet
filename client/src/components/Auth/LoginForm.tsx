import { Link, useNavigate } from "react-router"; // Remplace redirect par useNavigate
import { useAuth } from "./AuthForm";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialise le hook de navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3310/api/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        login(data);

        alert(`Bienvenue ${data.user.firstname ?? "utilisateur"} !`);

        // On utilise navigate pour changer de page
        navigate("/");
      } else {
        alert("Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="flex justify-center mt-20 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black p-8 rounded-2xl shadow-2xl my-10 border border-gray-800"
      >
        <h1 className="text-center text-2xl font-extrabold mb-2 text-white tracking-tight">
          CONNEXION
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="text-gray-300 text-xs font-semibold ml-1">
              EMAIL
            </label>
            <input
              className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-600"
              type="email"
              name="email"
              placeholder="johnDoe@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="text-gray-300 text-xs font-semibold">
                MOT DE PASSE
              </label>
            </div>
            <input
              className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-600"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-white text-black font-bold py-3 rounded-lg border-2 border-white
          hover:bg-black hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
        >
          Se connecter
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          Pas encore de compte ?{" "}
          <Link
            to="/Sign-up"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}

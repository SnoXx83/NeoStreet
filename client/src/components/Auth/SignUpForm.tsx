import { useState } from "react";
import { Link } from "react-router";

export type SignUpFormData = {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const navigate = useNavigate(); // ← Pour rediriger après inscription

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof SignUpFormData]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification mot de passe
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Envoi des données vers le backend
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstname,
          last_name: formData.lastname,
          email: formData.email,
          password: formData.password,
          logo_url: null,
        }),
      });

      if (response.ok) {
        alert("Compte créé !");
        // navigate("/sign-in"); // ← redirection vers la page de connexion
      } else {
        const errText = await response.text();
        console.error("Erreur backend:", errText);
        alert("Erreur lors de la création");
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
        <h1 className="text-center text-2xl font-extrabold mb-8 text-white tracking-tight">
          INSCRIPTION
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
              type="text"
              placeholder="Nom"
              required
            />
            <input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
              type="text"
              placeholder="Prénom"
              required
            />
          </div>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="email"
            placeholder="Adresse Email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-white text-black border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-500"
            type="password"
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-white text-black font-bold py-3 rounded-lg border-2 border-white hover:bg-black hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm"
        >
          Créer un compte
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          Déjà un compte ?{" "}
          <Link
            to="/sign-in"
            className="text-white font-bold hover:underline underline-offset-4"
          >
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";

type Tags = {
  id: number;
  label: string;
};

export default function CreateProductForm() {
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    async function getAllTags() {
      try {
        const response = await fetch("http://localhost:3310/api/tags");
        const result = await response.json();
        setTags(result);
      } catch (error) {
        console.log(error);
      }
    }
    getAllTags();
  }, []);

  async function createNewProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await fetch("http://localhost:3310/api/products", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Product ajouté:", result);
        alert("Produit ajouté !");
      } else {
        console.log("Erreur lors de la création");
      }
    } catch (error) {
      console.log(error);
      alert("Impossible de se connecter au serveur");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <form
        onSubmit={createNewProduct}
        className="w-full max-w-2xl bg-black p-8 rounded-2xl shadow-2xl border border-gray-800"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            AJOUTER UN PRODUIT
          </h1>
          <p className="text-gray-400 text-sm">
            Remplissez les informations pour le catalogue.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
              Nom du produit
            </label>
            <input
              className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-600"
              type="text"
              name="name"
              placeholder="Ex: Sneakers Edition Limitée"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-600 min-h-30"
              name="description"
              placeholder="Décrivez les caractéristiques du produit..."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
              URL de l'image
            </label>
            <input
              className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all placeholder:text-gray-600"
              type="url"
              name="image_url"
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
                Prix (€)
              </label>
              <input
                className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                type="number"
                step="0.01"
                name="price"
                placeholder="0.00"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
                Stock
              </label>
              <input
                className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                type="number"
                name="stock"
                placeholder="Ex: 50"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">
                Catégorie
              </label>
              <select
                className="w-full bg-zinc-900 text-white border border-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all appearance-none cursor-pointer"
                name="tag_id"
                required
              >
                <option value="">Choisir...</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {" "}
                    {tag.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-10 bg-white text-black font-bold py-4 rounded-xl border-2 border-white
          hover:bg-black hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-widest text-sm shadow-lg active:scale-95"
        >
          Enregistrer le produit
        </button>
      </form>
    </div>
  );
}

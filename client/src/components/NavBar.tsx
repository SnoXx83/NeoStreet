import { Link } from "react-router";

export default function NavBar() {
  return (
    <header className="bg-black text-white ">
      <div className="flex justify-around py-7">
        <div>NeoStreet</div>
        <div className="flex">
          <Link to={""} className="mx-2">
            Se connecter
          </Link>
          <Link to={""} className="mx-2">
            S'inscrire
          </Link>
          {/* <div className="mx-2">Mon panier</div> */}
        </div>
      </div>
    </header>
  );
}

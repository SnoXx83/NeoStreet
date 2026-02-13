import { Link } from "react-router";
import logo from "../assets/images/NeoStreet.png";

export default function NavBar() {
  return (
    <header className="bg-black text-white ">
      <div className="flex justify-around items-center py-2">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="max-h-25" />
        </Link>
        <div className="flex font-semibold text-center items-center">
          <Link to={"/Sign-in"} className="mx-2 ">
            Se connecter
          </Link>
          <Link to={"/Sign-up"} className="mx-2">
            S'inscrire
          </Link>
          {/* <div className="mx-2">Mon panier</div> */}
        </div>
      </div>
    </header>
  );
}

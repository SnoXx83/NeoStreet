import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar";
// import ProductDisplay from "./components/ProductDisplay";

function App() {
  return (
    <main className="text-box">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;

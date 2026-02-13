import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <main className="text-box">
        <NavBar/>
        <div>
          <ProductDisplay />
        </div>
      </main>
    </>
  );
}

export default App;

import "./App.css";
import NavBar from "./components/NavBar";
import ProductDisplay from "./components/ProductDisplay";
function App() {
  return (
    <>
      <main className="text-box">
        <NavBar />
        <div>
          <ProductDisplay />
        </div>
      </main>
    </>
  );
}

export default App;

import Navbar from "components/Navbar";
import "./assets/styles/custom.scss";
import "./App.css";


function App() {
  return (
    // um return de jsx não pode ter mais que um elemento.
    // para isso tem usar uma tag div ou a tag fragment
    <>
      <Navbar />
      <h1>Catálogo Online de Produtos</h1>
    </>
  );
}

export default App;

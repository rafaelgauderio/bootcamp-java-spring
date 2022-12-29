//import Home from 'pages/Home';
import "./assets/styles/custom.scss";
import "./App.css";
//import Catalog from 'pages/Home/Catalog';
import Rotas from 'Routes';


function App() {
  return (
    // um return de jsx não pode ter mais que um elemento.
    // para isso tem usar uma tag div ou a tag fragment    
    //<Home />    
    <Rotas></Rotas>
  );
}

export default App;

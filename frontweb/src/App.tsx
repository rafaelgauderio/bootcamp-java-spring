import Home from 'pages/Home';
import "./assets/styles/custom.scss";
import "./App.css";


function App() {
  return (
    // um return de jsx não pode ter mais que um elemento.
    // para isso tem usar uma tag div ou a tag fragment    
     <Home />    
  );
}

export default App;

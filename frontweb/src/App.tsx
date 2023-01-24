//import Home from 'pages/Home';
import './assets/styles/custom.scss';
//import Catalog from 'pages/Home/Catalog';
import Rotas from 'Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';

import './App.css';

function App() {
  // Função para prover o contexto Global
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    // um return de jsx não pode ter mais que um elemento.
    // para isso tem usar uma tag div ou a tag fragment
    //<Home />
    // useUsate agora é provisionado por toda a aplicação
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Rotas></Rotas>
    </AuthContext.Provider>
  );
}

export default App;

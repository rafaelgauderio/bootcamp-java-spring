import './assets/styles/custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import Rotas from 'Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';
// tostfy precisa ser importado apenas uma vez para toda a aplicação
import { ToastContainer } from 'react-toastify';


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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </AuthContext.Provider>
  );
}

export default App;

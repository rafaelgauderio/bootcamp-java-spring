import NavBar from './Navbar';
import './styles.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <NavBar></NavBar>
      <div className="admin-content">
        <h2>Conteúdo do painel do admim</h2>
      </div>
    </div>
  );
};

export default Admin;

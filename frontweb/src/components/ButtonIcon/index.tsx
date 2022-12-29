import './styles.css';

import { ReactComponent as SearchIcon} from 'assets/images/search.svg';

const ButtonIcon = () => {
  return (
    <div className="btn-container">      
        <button className="btn btn-primary">
          <h6>BUSCAR PRODUTOS AGORA</h6>
        </button>      
      <div className="btn-icon-container">
        <SearchIcon></SearchIcon>
      </div>
    </div>
  );
};

export default ButtonIcon;

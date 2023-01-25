import ProductCrudCard from 'components/ProductCrudCard';
import './styles.css';

const List = () => {
  const product02 = {
    id: 2,
    name: 'Smart TV',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 2190.0,
    imgURL:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
    date: '2020-07-14T10:00:00Z',
    categories: [
      {
        id: 1,
        name: 'Livros',
      },
      {
        id: 3,
        name: 'Computadores',
      },
    ],
  };
  return (
    <div>
      <button className="btn btn-primary text-white">Adicionar Novo</button>
      <div className="search-bar">Barra de Busca</div>

    <ProductCrudCard product={product02} />
    <ProductCrudCard product={product02} />
    <ProductCrudCard product={product02} />
    <ProductCrudCard product={product02} />    
    </div>
  );
};

export default List;

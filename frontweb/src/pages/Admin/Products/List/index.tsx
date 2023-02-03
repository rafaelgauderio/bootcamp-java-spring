import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import './styles.css';
import Pagination from 'components/Pagination';

type ControlComponentsData = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  // essência do padrão de projetos observer
  // fazer um componente que permite que permite outros componentes escrevam no evento dele
  //sempre que deleter um produto vai buscar a lista atualiza do backend

  // além do estado da pagina, necessário um  outro estado para salvar as info
  // dos componentes de controle da listagem (paginação e barra de filtragem)
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber }); // atualizar o estado que componente retornar
  };

  // use Effect roda sempre que o componente é montando e quando as dependências do componente forem alteradas
  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 5,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-search-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            Adicionar Novo
          </button>
        </Link>
        <div className="base-card search-bar-product-filter">
          Barra de Busca
        </div>
      </div>
      <div className="row">
        {page?.content.map((produto) => (
          <div key={produto.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={produto} onDelete={() => {}} />
          </div>
        ))}
      </div>

      <Pagination
        // Componente Pagination retorna apenas um número informando qual é página ativa
        // fazer um if ternário para tratar o caso do page ser undefined
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
        // apenas um ponteiro (referência da função) não está chamando a função getProducts()
      />
    </div>
  );
};

export default List;

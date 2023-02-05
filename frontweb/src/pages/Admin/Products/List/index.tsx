import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import './styles.css';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';

type ControlComponentsData = {
  activePage: number;
  filterData: ProductFilterData;
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
      // setar os valores iniciais dos componentes
      activePage: 0,
      filterData: { name: "", category: null }
    });

  // evento para tratar a altareção de página  
  const handlePageChange = (pageNumber: number) => {
    // mantém o que já estiver no filtre e altera apenas a data
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData }); // atualizar o estado que componente retornar

  };

  // evento para tratar o filtro
  const handleSubmitFilter = (data: ProductFilterData) => {
    // page 0, pois quando for feito um filtro deve voltar para a primeira página, a atualiza apenas o filtro
    setControlComponentsData({ activePage: 0, filterData: data });
  }

  // useCallback tem um função e lista de dependências como argumentos
  const getProducs = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 6,
        name: controlComponentsData.filterData.name,
        categoryId: controlComponentsData.filterData.category?.id
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  // use Effect roda sempre que o componente é montando e quando as dependências do componente forem alteradas
  useEffect(() => {
    getProducs();
  }, [getProducs]);

  // colocar função dentro do useEffect e como dependência gera um loop infinito
  // usar o hook useCallback para evitar isso. Se for a mesma referência da função, ele não chama a função novamente

  return (
    <div className="product-crud-container">
      <div className="product-crud-search-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            Adicionar Novo
          </button>
        </Link>
        <ProductFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="row">
        {page?.content.map((produto) => (
          <div key={produto.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={produto} onDelete={getProducs} />
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
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

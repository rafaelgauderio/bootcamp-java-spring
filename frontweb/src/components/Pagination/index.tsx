import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

import './styles.css';

type Props = {
  range: number;
  pageCount: number;
  forcePage?: number; 
  onChange?: (pageNumber: number) => void; //tipar função para ter um typesafe
};

const Pagination = ({ pageCount, range, forcePage, onChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      pageLinkClassName="pagination-item"
      containerClassName="pagination-container"
      breakClassName="pagination-item"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      previousClassName="arrow-previus"
      nextClassName="arrow-next"
      disabledLinkClassName='arrow-inactive'
      onPageChange={(itemsDaPaginacao) =>
        onChange ? onChange(itemsDaPaginacao.selected) : {}
      }
      // pegar o número de página alterada no ReactPaginate
      // if ternário para tratar caso do objeto onChange ser undefined
      previousLabel={
        <div className="pagination-arrow-container" data-testid="arrow-previous">
          <ArrowIcon />
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon data-testid="arrow-next" />
        </div>
      }
    />
  );
};

export default Pagination;

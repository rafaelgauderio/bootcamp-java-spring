import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

import './styles.css';

const Pagination = () => {
  return (
    <ReactPaginate
      pageCount={10}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      pageLinkClassName="pagination-item"
      containerClassName="pagination-container"
      breakClassName="pagination-item"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      previousLabel={<ArrowIcon></ArrowIcon>}
      nextLabel={<ArrowIcon></ArrowIcon>}
      previousClassName="arrow-previus"
      nextClassName="arrow-next"
    />
  );
};

export default Pagination;

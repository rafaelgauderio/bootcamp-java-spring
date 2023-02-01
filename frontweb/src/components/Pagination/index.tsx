import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';


import './styles.css';

const Pagination = () => {
  return (
    <>
      <ReactPaginate
        pageCount={10}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
      />

      <div className="pagination-container">
        <ArrowIcon className="arrow-inactive arrow-previus"></ArrowIcon>
        <div className="pagination-item actived">1</div>
        <div className="pagination-item">2</div>
        <div className="pagination-item">3</div>
        <div className="pagination-item">4</div>
        <div className="pagination-item">...</div>
        <div className="pagination-item">9</div>
        <ArrowIcon className="arrow-active arrow-next"></ArrowIcon>
      </div>
    </>
  );
};

export default Pagination;

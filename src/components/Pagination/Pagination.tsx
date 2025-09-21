// src/components/Pagination.tsx
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ReactPaginate
      nextLabel="→"
      previousLabel="←"
      // onPageChange={({ selected }) => setCurPage(selected + 1)}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      previousClassName={isFirstPage ? css.disabled : ""}
      nextClassName={isLastPage ? css.disabled : ""}
      marginPagesDisplayed={1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

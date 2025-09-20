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
      renderOnZeroPageCount={null}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;

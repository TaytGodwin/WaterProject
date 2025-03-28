interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex item-senter justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {/*Subtract 1 from current page number*/}
      {[...Array(totalPages)].map(
        (
          _,
          index // Array of the total number of pages
        ) => (
          // Index starts at 0 and counts on
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {/* Sets what page you are on */}
            {index + 1}
            {/* Shows page number */}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      {/*Add 1 to current page number*/}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            onPageSizeChange(Number(p.target.value));
            onPageChange(1); // Sets page number back to 1 when they change
          }}
        >
          {' '}
          {/* This changes the pageSize variable when the drop down changes */}
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;

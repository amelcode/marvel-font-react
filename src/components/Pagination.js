const Pagination = ({ setSkip, currentPage, setCurrentPage, countData, limit }) => {
  let skipNumber = currentPage * limit;

  return (
    <div className="pagination">
      <button
        disabled={currentPage <= 1 && true}
        value={currentPage - 1}
        onClick={(e) => {
          setCurrentPage(currentPage - 1);
          setSkip(skipNumber);
        }}
      >
        &#60;
      </button>

      <button value={Number(currentPage)}>{Number(currentPage)}</button>
      
      <button
        disabled={currentPage * limit >= countData && true}
        value={Number(currentPage) + 1}
        onClick={(e) => {
          setCurrentPage(currentPage + 1);
          setSkip(skipNumber);
        }}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;

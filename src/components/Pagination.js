const Pagination = ({ setSkip, currentPage, setCurrentPage, countData }) => {
  let skipNumber = currentPage * 100;

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
        disabled={currentPage * 100 >= countData && true}
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

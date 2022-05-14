import { useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, countData }) =>{
  console.log('countData', countData);
  // const [currentPage, setCurrentPage] = useState(1);
  // console.log("currentPage", currentPage);

  const [pages, setPages] = useState([]);
  const page = [];
  const limitePage = countData/100
    console.log('limitePage', limitePage);
    if (currentPage <limitePage){  
      for (let i = 0; i < limitePage; i++) {
        const newPage = [...page];
          page.push(
          <button key={i} value={Number(currentPage) + Number(i)}>
            {Number(currentPage) + Number(i)}
          </button>)
          setPages(newPage);
        ;}
      
    }

  // for (let i = 0; i < 5; i++) {
  //      page.push(
  //     <button key={i} value={Number(currentPage) + Number(i)}>
  //       {Number(currentPage) + Number(i)}
  //     </button>
  //   );}
  // }
  console.log('page', page);

  return (
    <div
      className="Pagination"
      onClick={(e) => {
        setCurrentPage(e.target.value);
      }}
    >
      <button
        disabled={currentPage <= 1 && true}
        value={currentPage - 1}
        onClick={(e) => {
          setCurrentPage(currentPage - 1);
        }}
      >
        &#60;
      </button>

      {page}
      {currentPage >= (countData/100) &&
      <button
        disabled={currentPage >= (countData/100+1) && true}
        value={Number(currentPage) + 1}
        onClick={(e) => {
          setCurrentPage(currentPage + 1);
        }}
      >
        &#62;
      </button>}
    </div>
  );
}

export default Pagination;
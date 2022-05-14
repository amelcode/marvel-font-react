import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Pagination from "../components/Pagination";
const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState(null);
  const [search, setSearch] = useState("");
  const [favoritesComics, setFavoritesComics] = useState("");

  const [countData, setCountData] = useState(0);
  //const [currentPage, setCurrentPage] = useState(1);

  // TEST
  // console.log("response", response);
  // console.log("comics", comics);
  // console.log('search', search);
  // console.log('skip', skip);
  // console.log('countData', countData);

  //const limitComics = 100;
  const skip = 0;
  const fetchData = async () => {
    // const skip = currentPage > 1 ? (currentPage * limitComics - limitComics) : 0;

    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/comics?skip=${skip}`
    );

    console.log("response", response);
    setComics(response.data.results);
    setCountData(response.data.count);
    setIsLoading(false);
    // console.log('countData', countData);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search", search);
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="page-comics">
      <h1>Comics</h1>
      {/* <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} countData={countData} /> */}
      <form className="form-search" onSubmit={handleSubmit}>
        <div>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            console.log("search", search);
          }}
        />
        <input type="submit" value="search" />
      </form>
      <div className="containe-card">
        {comics.map((comic) => {
          return (
            <Card
              key={comic._id}
              id={comic._id}
              name={comic.title}
              // description={comic.description}
              imageLink={comic.thumbnail.path}
              imageExtension={comic.thumbnail.extension}
              setFavoritesComics={setFavoritesComics}
              objFav={{ favoritesComics: comic.title }}
            />
          );
        })}{" "}
      </div>
    </div>
  );
};
export default Comics;

import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState(null);
  // console.log("comics", comics);
  const [search, setSearch] = useState("");
  const [favoritesComics, setFavoritesComics] = useState("");

  const [skip, setSkip] = useState(0);
  const [countData, setCountData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-back-express.herokuapp.com/comics?skip=${skip}&title=${search}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    setComics(response.data.results);
    setCountData(response.data.count);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search, skip]);

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
    <Loading />
  ) : (
    <div className="page-comics">
      <h1>Comics</h1>

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
          }}
        />
        <input type="submit" value="Search" />
      </form>
      <Pagination
        setSkip={setSkip}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        countData={countData}
      />
      <div className="containe-card">
        {comics.map((comic) => {
          return (
            <Card
              key={comic._id}
              id={comic._id}
              name={comic.title}
              imageLink={comic.thumbnail.path}
              imageExtension={comic.thumbnail.extension}
              setFavoritesComics={setFavoritesComics}
              objFav={{ favoritesComics: comic.title }}
              dataElement={comic}
              nameElement="comic"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Comics;

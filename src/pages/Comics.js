import { useState, useEffect } from "react";
import axios from "axios";

export default function Comics() {
  const [data, setData] = useState(null);
  const [comics, setComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // TEST
  console.log("data", data);
  console.log("comics", comics);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:3200/comics");
        setData(response.data);
        setComics(response.data.results);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="Comics">
      <h1>Comics</h1>

      {comics.map((comic) => {
        console.log("comic", comic);
        return (
          <div key={comic.id}>
            <h2>{comic.title}</h2>
            <p>{comic.description}</p>
            {/* <img src={comic.thumbnail.path} alt="" /> */}
          </div>
        );
      })}
    </div>
  );
}

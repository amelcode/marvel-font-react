import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const { characterId } = useParams();
  console.log("characterId", characterId);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacter, setDataCharacter] = useState(null);
  const [dataComics, setDataComics] = useState(null);

  const divRef = useRef();

  const fetchDataComics = async () => {
    const response = await axios.get(
      `http://localhost:3200/comics/${characterId}`
    );
    console.log("response fetchDataComics", response);
    console.log("response.data", response.data);
    setDataCharacter(response.data);
    setDataComics(response.data.comics);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      fetchDataComics();
      divRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log('character', character);

  return isLoading ? (
    


    <p ref={divRef}>En cours de chargement</p>
  ) : (
    <>
      <div  className="page-character">
        <h1>{dataCharacter.name}</h1>

        <img
          src={`${dataCharacter.thumbnail.path}/portrait_xlarge.jpg`}
          alt={dataCharacter.name}
        />
        <p>{dataCharacter.description}</p>
      </div>
      {dataComics.map((comic) => {
        console.log("comic", comic);

        return (
          <div key={comic._id}>
            <h2>{comic.title}</h2>
            <img
              src={`${comic.thumbnail.path}/portrait_xlarge.jpg`}
              alt={comic.name}
            />
          </div>
        );
      })}
    </>
  );
};
export default Character;

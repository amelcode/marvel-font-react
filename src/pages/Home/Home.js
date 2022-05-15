import { Link } from "react-router-dom";
import "./home.css";
import comicsImage from "../../asset/images/home_comics.jpeg";
import charactersImage from "../../asset/images/home_characters.jpeg";

export default function Home() {
  return (
    <>
      {" "}

      <div className="page-home">
        <section className="home-comics">
          <img src={comicsImage} alt="comics" />
          <div className="cover-image">
            <Link to="/comics">
              <p className="font-face-bw">Comics</p>
            </Link>
          </div>
        </section>

        <section className="home-characters">
          <img src={charactersImage} alt="characters" />
          <div className="cover-image">
            <Link to="/characters">
              <p>Character</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

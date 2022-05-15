import page404 from "../asset/images/page-404.png";
const NotFound = () => {
  return (
    <div className="page-not-found">
    <div>
    <img src={page404} alt="404 hydra logo" />
    <h1>404 PAGE NOT FOUND</h1>
      <h2>HYDRA is currently attacking this page!</h2>
      <p>Check that you typed the address correctly, go back to your previous
page or try using our site search to find something specific.</p>
    </div></div>
  );
}

export default NotFound;
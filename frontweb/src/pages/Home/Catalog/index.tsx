import NavBar from "components/Navbar";
import ProductCard from "components/ProductCard";

const Catalog = () => {

  return (
    <>
    <NavBar></NavBar>
      <div className="container my-4">
        <ProductCard></ProductCard>
      </div>
    </>
  );
};

export default Catalog;

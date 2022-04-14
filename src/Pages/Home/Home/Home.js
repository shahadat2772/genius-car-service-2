import React from "react";
import Banner from "../Banner/Banner";
import Experts from "../Experts/Experts";
import Services from "../Services/Services";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <Experts></Experts>
      <Footer></Footer>
    </div>
  );
};

export default Home;

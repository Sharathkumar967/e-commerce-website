import React from "react";
import Hero from "../components/navbar/hero/Hero";
import Popular from "../components/navbar/popular/Popular";
import Offers from "../components/navbar/offers/Offers";
import NewCollections from "../components/navbar/newCollections/NewCollections";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
    </div>
  );
};

export default Shop;

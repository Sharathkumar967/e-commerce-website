import React, { useRef } from "react";
import Hero from "../components/hero/Hero";
import Popular from "../components/popular/Popular";
import Offers from "../components/offers/Offers";
import NewCollections from "../components/newCollections/NewCollections";
import NewsLetter from "../components/newsLetter/NewsLetter";

const Shop = () => {
  const latestCollectionRef = useRef(null);
  return (
    <div>
      <Hero latestCollectionRef={latestCollectionRef} />
      <Popular />
      <Offers />
      <NewCollections ref={latestCollectionRef} />
      <NewsLetter />
    </div>
  );
};

export default Shop;

import React from "react";
import BarangpItem from "./BarangpItem";

const BarangpList = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <BarangpItem key={product.id} product={product}/>
      ))}
    </>
  );
};

export default BarangpList;

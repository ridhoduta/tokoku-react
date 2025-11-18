import React from "react";
import BarangpItem from "./BarangpItem";

const BarangpList = ({ products, setAlert }) => {
  return (
    <>
      {products.map((product) => (
        <BarangpItem key={product.id} product={product} setAlert={setAlert} />
      ))}
    </>
  );
};

export default BarangpList;

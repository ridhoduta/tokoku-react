import React from "react";
import BarangpItem from "./BarangpItem";

const BarangpList = ({ products, setAlert, onSelect }) => {
  return (
    <>
      {products.map((product) => (
        <BarangpItem key={product.id} product={product} setAlert={setAlert} onSelect={onSelect}/>
      ))}
    </>
  );
};

export default BarangpList;

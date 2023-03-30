import React, { useEffect, useState } from "react";
import Product from "./Product";
import { popularProducts } from "../data";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";

const Cotainaer = styled.div`
  display: flex;
  padding: 30px;
  /* justify-content: space-between; */
  overflow: hidden;
  flex-wrap: wrap;
  margin: 3px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterdProdcuts, setFilterdProdcuts] = useState([]);

  const [productsFlag, setProductsFlag] = useState(false);
  const [filterFlag, setFilterFlag] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );

        setProducts(res.data);
        setProductsFlag(true);
        setFilterdProdcuts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat, productsFlag]);

  useEffect(() => {
    filters && filterItems(filters);
  }, [filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterdProdcuts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterdProdcuts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterdProdcuts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  const filterItems = (filt) => {
    if (filt.color !== "Color") {
      const found = products.filter(
        (item) =>
          (item.color.includes(filt.color) || filt.color === undefined) &&
          (item.size.includes(filt.size) || filt.size === undefined)
      );
      setFilterdProdcuts(found);
    }
  };

  return (
    <Cotainaer>
      {filters?.color !== "Color"
        ? filterdProdcuts.map((item) => (
            <Product
              key={item._id}
              img={item.img}
              id={item._id}
              title={item.title}
              price={item.price}
            />
          ))
        : products.map((item) => (
            <Product
              key={item._id}
              img={item.img}
              id={item._id}
              title={item.title}
              price={item.price}
            />
          ))}
    </Cotainaer>
  );
};

export default Products;

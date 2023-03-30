import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: #f5fafd;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const cat = useLocation().pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(["new", "asc", "desc"]);
  const [sortValue, setSortValue] = useState("new");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  const hansleSort = (e) => {
    const value = e.target.value;
    setSortValue(value);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>

            <Option>Green</Option>
            <Option>Gray</Option>
            <Option>Brown</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option>Size</Option>

            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={hansleSort}>
            <Option value={sort[0]}>Newest</Option>
            <Option value={sort[1]}>Price (asc)</Option>
            <Option value={sort[2]}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sortValue} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;

import styled from "styled-components/macro";
import Head from "./Head";
import Main from "./Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logo from "components/Logo";
import RestaurantList from "components/RestaurantList";

//style
const GlobalWrapper = styled.div`
  width: 48rem;
  height: 100%;
  margin: 0 auto;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalWrapper>
        <Head />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="restaurant/*" element={<RestaurantList />} />
          
        </Routes>
      </GlobalWrapper>
    </BrowserRouter>
  );
}

export default App;

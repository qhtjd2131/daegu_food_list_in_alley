import styled from "styled-components/macro";
import Head from "./Head";
import Main from "./Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantList from "components/RestaurantList";
import Line from "components/Line";

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
        <Line lineNumber={1} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="restaurant/:location/:alley" element={<RestaurantList />} />
          
        </Routes>
      </GlobalWrapper>
    </BrowserRouter>
  );
}

export default App;

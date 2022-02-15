import styled from "styled-components";
import React from "react";
import { getFoodInfoInAlley } from "apiCall";
import { useEffect } from "react";
import { useState } from "react";

//style
const MainWrapper = styled.section``;

const Main = () => {
  const [dataDaleseo, setDataDaleseo] = useState({});  //달서구 데이터
  const [dataJoong, setDatadataJoong] = useState({}); //중구 데이터
  const [dataSuseong, setDataSuseong] = useState({}); //수성구 데이터
  const [dataBook, setDataBook] = useState({}); //북구 데이터
  const [dataSeo, setDataSeo] = useState({}); //서구 데이터
  const [dataDong, setDataDong] = useState({}); //동구 데이터
  const [dataNam, setDataNam] = useState({}); //남구 데이터
  const [dataGoon, setDataGoon] = useState({}); //달성군 데이터



  const location_name = ["중구", "서구", "동구","남구", "달서구", "수성구", "북구", "달성군"];

  useEffect(() => {
    getFoodInfoInAlley().then((res) => {
      const merged_data = [...res[0], ...res[1], ...res[2], ...res[3]];

    //   console.log(merged_data);
    });
  }, []);

  return <MainWrapper>main</MainWrapper>;
};

export default Main;

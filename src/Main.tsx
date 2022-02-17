import styled from "styled-components";
import React from "react";
import { getFoodInfoInAlley, IFoodInfo } from "apiCall";
import { useEffect } from "react";
import { useState } from "react";

//style
const MainWrapper = styled.section``;

const Main = () => {
  const [dataDaleseo, setDataDaleseo] = useState({}); //달서구 데이터
  const [dataJoong, setDatadataJoong] = useState({}); //중구 데이터
  const [dataSuseong, setDataSuseong] = useState({}); //수성구 데이터
  const [dataBook, setDataBook] = useState({}); //북구 데이터
  const [dataSeo, setDataSeo] = useState({}); //서구 데이터
  const [dataDong, setDataDong] = useState({}); //동구 데이터
  const [dataNam, setDataNam] = useState({}); //남구 데이터
  const [dataGoon, setDataGoon] = useState({}); //달성군 데이터

  const location_name = [
    "중구",
    "서구",
    "동구",
    "남구",
    "달서구",
    "수성구",
    "북구",
    "달성군",
  ];

  async function classifyData(data: IFoodInfo[]) {
    console.log("classifyData()");

    //동기적으로 실행하게 변경해야함
    const promise1 = new Promise((resolve, reject) => {
      let case_1_arr: IFoodInfo[] = []; //중구
      let case_2_arr: IFoodInfo[] = []; //남구
      let case_3_arr: IFoodInfo[] = []; //서구
      let case_4_arr: IFoodInfo[] = []; //동구
      let case_5_arr: IFoodInfo[] = []; //달서구
      let case_6_arr: IFoodInfo[] = []; //달성군
      let case_7_arr: IFoodInfo[] = []; //수성구
      let case_8_arr: IFoodInfo[] = []; //북구
      data.forEach((mdata) => {
        switch (mdata.시군구) {
          case "중구":
            case_1_arr.push(mdata);
            break;
          case "남구":
            case_2_arr.push(mdata);
            break;
          case "서구":
            case_3_arr.push(mdata);
            break;
          case "동구":
            case_4_arr.push(mdata);
            break;
          case "달서구":
            case_5_arr.push(mdata);
            break;
          case "달성군":
            case_6_arr.push(mdata);
            break;
          case "수성구":
            case_7_arr.push(mdata);
            break;
          case "북구":
            case_8_arr.push(mdata);
            break;
        }
        const temp = {
          중구: case_1_arr,
          남구: case_2_arr,
          서구: case_3_arr,
          동구: case_4_arr,
          달서구: case_5_arr,
          달성군: case_6_arr,
          수성구: case_7_arr,
          북구: case_8_arr,
        };
        resolve(temp);
      });
    }).then((case1) => {
      console.log("분류 완료");
      console.log("temp : ", case1);
    });
  }

  useEffect(() => {
    console.log("useEffect()");
    getFoodInfoInAlley().then((res) => {
      const merged_data = [...res[0], ...res[1], ...res[2], ...res[3]];
      classifyData(merged_data);
    });
  }, []);

  return <MainWrapper>main</MainWrapper>;
};

export default Main;

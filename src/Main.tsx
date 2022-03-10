import styled from "styled-components/macro";
import React from "react";
import {
  getAlleyList,
  getFoodInfoInAlley,
  IAlley,
  IAlleyTemp,
  IFoodInfo,
  IFoodInfos,
} from "apiCall";
import { useEffect } from "react";
import { useState } from "react";
import LocationCard from "components/LocationCard";

//style
const MainWrapper = styled.section``;

//interface

//fuctions

export function classifyData(data: IFoodInfo[]): Promise<IFoodInfos> {
  console.log("데이터 분류...");
  return new Promise((resolve, reject) => {
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
    });
    const temp: IFoodInfos = {
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
}


const Main = () => {

  const [restaurantList, setRestaurantList] = useState<IFoodInfos>({
    중구: [],
    남구: [],
    동구: [],
    서구: [],
    북구: [],
    달서구: [],
    달성군: [],
    수성구: [],
  });
  const [alleyList, setAlleyList] = useState<IAlleyTemp>({
    중구: [],
    남구: [],
    동구: [],
    서구: [],
    북구: [],
    달서구: [],
    달성군: [],
    수성구: [],
  });
  const [isLoading, setIsLoading] = useState(true);

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

  

  useEffect(() => {
    let startTime :any= new Date();
    let endTime : any;
    getFoodInfoInAlley().then((res) => {
      const merged_data = [...res[0], ...res[1], ...res[2], ...res[3]];
      classifyData(merged_data).then((temp: IFoodInfos) => {


        setRestaurantList(temp);
        //loading state 처리
        setIsLoading(false);
        endTime = new Date();
        console.log("경과시간(ms) :", endTime - startTime)  
      });
    });
  }, []);

  useEffect(() => {
    getAlleyList().then((alleys: IAlleyTemp) => {
      setAlleyList(alleys);
    });
  }, []);

  return (
    <MainWrapper>
      {isLoading
        ? "loading ..."
        : location_name.map((loc_name, index) => (
            <LocationCard
              key={index}
              loc_name={loc_name}
              alleyList={alleyList}
              restaurantList = {restaurantList}
            />
          ))}
    </MainWrapper>
  );
};

export default Main;

import styled from "styled-components/macro";
import React from "react";
import {
  getAlleyList,
  getFoodInfoInAlley,
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
  
  // console.log("데이터 분류...");
  return new Promise((resolve, reject) => {
    let temp_arr : IFoodInfos = {
      중구: [],
      남구: [],
      동구: [],
      서구: [],
      북구: [],
      달서구: [],
      달성군: [],
      수성구: [],
    };

    data.forEach((value)=>{
      temp_arr[value.시군구].push(value);
    })
    
    resolve(temp_arr);
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
    let startTime: any = new Date();
    let endTime: any;

    getFoodInfoInAlley().then((res) => {
      const merged_data = [...res[0], ...res[1], ...res[2], ...res[3]];
      endTime = new Date();
      // console.log("데이터 fetch 경과시간(ms) :", endTime - startTime);

      startTime = new Date();
      classifyData(merged_data).then((temp: IFoodInfos) => {
        endTime = new Date();
        // console.log("데이터 분류 경과시간(ms) :", endTime - startTime);

        setRestaurantList(temp);
        //loading state 처리
        setIsLoading(false);

        // console.log("경과시간(ms) :", endTime - startTime);
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
              restaurantList={restaurantList}
            />
          ))}
    </MainWrapper>
  );
};

export default Main;

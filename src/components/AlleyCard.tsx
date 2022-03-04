import { IFoodInfo } from "apiCall";
import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components/macro";
import Logo from "./Logo";

const AlleyCardWrapper = styled.div`
  border: 1px solid black;
`;

const AlleyTitle = styled.p``;

interface IAlleyCardProps {
  alleyListInLocation: string[];
  restaurantListInAlley: IFoodInfo[];
}
const AlleyCard = ({
  alleyListInLocation,
  restaurantListInAlley,
}: IAlleyCardProps) => {
  console.log(restaurantListInAlley);

  const classifyDataInRes = () => {
    return new Promise((resolve, reject) => {
      let temp: any = {};
      restaurantListInAlley.forEach((value) => {
        const restaurantIndex = value["업소 식별번호"];
        if (temp[restaurantIndex]) {
          temp[restaurantIndex] = {
            restaurantName: value.업소명,
            menu: [
              ...temp[restaurantIndex].menu,
              {
                [value.메뉴명]: value["가격(원)"],
              },
            ],
          };
        } else {
          temp[restaurantIndex] = {
            restaurantName: value.업소명,
            menu: [
              {
                [value.메뉴명]: value["가격(원)"],
              },
            ],
          };
        }
      });

      resolve(temp);
    });
  };

  useEffect(() => {
    classifyDataInRes().then((data) => {
      console.log("temp : ", data);
    });
  }, []);

  return (
    <AlleyCardWrapper>
      {alleyListInLocation.map((alley: any, index: number) => (
        <Link to={`/restaurant/${alley}` }>
          <AlleyTitle key={index}>{alley}</AlleyTitle>
        </Link>
      ))}
    </AlleyCardWrapper>
  );
};

export default AlleyCard;

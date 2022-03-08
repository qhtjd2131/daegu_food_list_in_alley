import { IFoodInfo, IFoodInfos } from "apiCall";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components/macro";
import Logo from "./Logo";
import { IRestaurantListInAlley } from "./RestaurantList";

const AlleyCardWrapper = styled.div`
  border: 1px solid black;
`;

const AlleyTitle = styled.p``;

interface IAlleyCardProps {
  alleyListInLocation: string[];
  restaurantListInAlley: IFoodInfo[];
  locationName: string;
}

//function
export const classifyDataInRes = (restaurantListInAlley : IFoodInfo[]): Promise<IRestaurantListInAlley> => {
  return new Promise((resolve, reject) => {
    let temp: any = {};
    restaurantListInAlley.forEach((value: any) => {
      const restaurantIndex = value["업소 식별번호"];
      if (temp[restaurantIndex]) {
        temp[restaurantIndex] = {
          restaurantName: value.업소명,
          menu: [
            ...temp[restaurantIndex].menu,
            {
              menuName: value.메뉴명,
              cost: value["가격(원)"],
            },
          ],
        };
      } else {
        temp[restaurantIndex] = {
          restaurantName: value.업소명,
          menu: [
            {
              menuName: value.메뉴명,
              cost: value["가격(원)"],
            },
          ],
        };
      }
    });

    resolve(temp);
  });
};
const AlleyCard = ({
  alleyListInLocation,
  restaurantListInAlley,
  locationName,
}: IAlleyCardProps) => {
  const [restaurantList, setRestaurantList] = useState<any>();
  console.log("restaurantListInAlley", restaurantListInAlley);
  console.log("alleyListInLocation", alleyListInLocation);

  let navigate = useNavigate();

  useEffect(() => {
    classifyDataInRes(restaurantListInAlley).then((data) => {
      console.log("temp : ", data);
      setRestaurantList(data);
    });
  }, []);

  return (
    <AlleyCardWrapper>
      {alleyListInLocation.map((alley: any, index: number) => (
        <div
          onClick={() => {
            navigate(`/restaurant/${locationName}/${alley}`, {
              state: restaurantList,
            });
          }}
        >
          <AlleyTitle key={index}>{alley}</AlleyTitle>
        </div>
      ))}
    </AlleyCardWrapper>
  );
};

export default AlleyCard;

import { IFoodInfo } from "apiCall";
import React, { useEffect, useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import styled from "styled-components/macro";
import { IRestaurantListInAlley } from "./RestaurantList";

const AlleyCardWrapper = styled.div`
  border: 1px solid black;

`;

const AlleyTitle = styled.p`
 width : 100%;
 cursor : pointer;
 margin : 0;
 padding : 0.4rem 0;
 padding-left  :0.4rem;
 &:hover{
   background-color : #ececec;
 }
`;

interface IAlleyCardProps {
  alleyListInLocation: string[];
  restaurantListInAlley: IFoodInfo[];
  locationName: string;
}

//function
export const classifyDataInRes = (
  restaurantListInAlley: IFoodInfo[]
): Promise<IRestaurantListInAlley> => {
  return new Promise((resolve, reject) => {
    let temp: any = {};

    restaurantListInAlley.forEach((value: any) => {
      const restaurantIndex = value["업소 식별번호"];
      if (temp[restaurantIndex]) {
        temp[restaurantIndex].menu = [
          ...temp[restaurantIndex].menu,
          {
            menuName: value.메뉴명,
            cost: value["가격(원)"],
          },
        ];
      } else {
        temp[restaurantIndex] = {
          restaurantName: value.업소명,
          alleyName: value.골목명,
          location: value.시군구,

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


  let navigate = useNavigate();

  useEffect(() => {
    classifyDataInRes(restaurantListInAlley).then((data) => {
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
          key={index}
        >
          <AlleyTitle>{alley}</AlleyTitle>
        </div>
      ))}
    </AlleyCardWrapper>
  );
};

export default AlleyCard;

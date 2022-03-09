import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFoodInfoInAlley, IFoodInfos } from "apiCall";
import { classifyData } from "Main";
import { classifyDataInRes } from "./AlleyCard";
import RestaurantItem from "./RestaurantItem";

//style
const RestaurantListWrapper = styled.div``;

const TitleBox = styled.div``;

const LocationName = styled.p`
  font-size: 1.8rem;
  margin: 0;
`;
const AlleyName = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

const RestaurantBox = styled.div``;
const RestaurantName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
`;
const MenuBox = styled.div``;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  &:hover {
    background-color: #ececec;
  }
`;
const MenuName = styled.p`
  margin: 0;
`;
const Cost = styled.p`
  margin: 0;
  white-space: nowrap;
`;

//inteface
export interface IRestaurantListInAlley {
  [index: string]: IRestaurant;
}

export interface IRestaurant {
  restaurantName: string;
  menu: IMenu[];
}
export interface IMenu {
  menuName: string;
  cost: string;
}

//Component
const RestaurantList = () => {
  let params: any = useParams();
  const location: any = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [restaurantMenuList, setRestaurantMenuList] =
    useState<IRestaurantListInAlley>((): IRestaurantListInAlley => {
      if (location.state) {
        return location.state;
      } else {
        return {
          "00000": {
            restaurantName: "",
            menu: [
              {
                menuName: "",
                cost: "",
              },
            ],
          },
        };
      }
    });

  // console.log("params", params);
  // console.log("location.state : ", location.state);

  useEffect(() => {
    if (!location.state) {
      console.log("데이터가 없습니다. 데이터를 받아옵니다.");
      getFoodInfoInAlley()
        .then((res) => {
          const merged_data = [...res[0], ...res[1], ...res[2], ...res[3]];
          return classifyData(merged_data);
        })
        .then((res2: IFoodInfos) => {
          return classifyDataInRes(res2[params.location]);
        })
        .then((res3: IRestaurantListInAlley) => {
          setRestaurantMenuList(res3);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <RestaurantListWrapper>
      {isLoading ? (
        "loading.."
      ) : (
        <>
          <TitleBox>
            <LocationName>{params.location}</LocationName>
            <AlleyName>{params.alley}</AlleyName>
          </TitleBox>
          {Object.keys(restaurantMenuList).map((key: string) => (
            <RestaurantItem
              key={key}
              restaurantName={restaurantMenuList[key].restaurantName}
              menu={restaurantMenuList[key].menu}
            />
          ))}
        </>
      )}
    </RestaurantListWrapper>
  );
};

export default RestaurantList;

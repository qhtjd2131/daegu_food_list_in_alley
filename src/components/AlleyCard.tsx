import { IFoodInfo } from "apiCall";
import React, { useEffect } from "react";
import styled from "styled-components/macro";

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
    // let temp : number[] = [];
    // restaurantListInAlley.filter((value) => {

    //     // if(!temp.includes(value["업소 식별번호"])){
    //     //     temp.push(value["업소 식별번호"])
    //     // }

    //     return ;
    // })

    return new Promise((resolve, reject) => {
      let temp: any = {};
      restaurantListInAlley.forEach((value) => {
        temp[value["업소 식별번호"]] = {
          ...temp[value["업소 식별번호"]],

          [value["메뉴명"]]: {
            restaurantName: value.업소명,
            cost: value["가격(원)"],
          },
        };
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
        <AlleyTitle key={index}>{alley}</AlleyTitle>
      ))}
    </AlleyCardWrapper>
  );
};

export default AlleyCard;

import { IAlleyTemp, IFoodInfos } from "apiCall";
import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components/macro";
import AlleyCard from "./AlleyCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LocationCardWrapper = styled.div<{ maxHeight: boolean }>`
  /* border: 1px solid black; */
  transition: 0.6s ease-in-out;
  max-height: 30rem;
  overflow: hidden;
  ${(props) =>
    !props.maxHeight &&
    css`
      max-height: 3rem;
    `}
`;

const LocationTitle = styled.p`
  font-size: 1.2rem;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  height: 3rem;
  cursor: pointer;
  &:hover {
    background-color: #cfcfcf;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  box-sizing: border-box;
  width: 3rem;
  height: 3rem;
`;
//interface

interface ILocationCardProps {
  [index : string] : any;
  loc_name: string;
  alleyList: IAlleyTemp;
  restaurantList : IFoodInfos;
}

const LocationCard = ({ loc_name, alleyList, restaurantList }: ILocationCardProps) => {
  const [isOpenAlley, setIsOpenAlley] = useState<boolean>(false);
  const IconStyle: any = {
    width: "100%",
    height: "100%",
  };

  const clickHandler = useCallback(() => {
    setIsOpenAlley((isopen) => {
      return !isopen;
    });
  }, []);

  const buttonRender = useCallback(() => {
    if (isOpenAlley) {
      return (
        <ButtonWrapper>
          <IoIosArrowUp style={IconStyle} />
        </ButtonWrapper>
      );
    } else {
      return (
        <ButtonWrapper>
          <IoIosArrowDown style={IconStyle} />
        </ButtonWrapper>
      );
    }
  }, [isOpenAlley]);

  return (
    <LocationCardWrapper maxHeight={isOpenAlley}>
      <LocationBox
        onClick={() => {
          clickHandler();
        }}
      >
        <LocationTitle>{loc_name}</LocationTitle>
        {buttonRender()}
      </LocationBox>

      <AlleyCard alleyListInLocation={alleyList[loc_name]} restaurantListInAlley={restaurantList[loc_name]}/>
    </LocationCardWrapper>
  );
};

export default LocationCard;

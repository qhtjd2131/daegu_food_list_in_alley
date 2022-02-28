import { IAlleyTemp } from "apiCall";
import React from "react";
import styled from "styled-components";
import AlleyCard from "./AlleyCard";

const LocationCardWrapper = styled.div`
  border: 1px solid black;
`;

const LocationTitle = styled.p``;

//interface

interface ILocationProps {
  loc_name: string;
  alleyList : IAlleyTemp;
}
const LocationCard = ({ loc_name, alleyList }: ILocationProps) => {


  return (
    <LocationCardWrapper>
      <LocationTitle>{loc_name}</LocationTitle>
      <AlleyCard alleyListInLocation={alleyList[loc_name]}/>
    </LocationCardWrapper>
  );
};

export default LocationCard;

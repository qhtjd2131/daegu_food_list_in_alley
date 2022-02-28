import React from "react";
import styled from "styled-components";

const AlleyCardWrapper = styled.div`
  border: 1px solid black;
`;

const AlleyTitle = styled.p``;
const AlleyCard = ({ alleyListInLocation }: any) => {
  return (
    <AlleyCardWrapper>
      {alleyListInLocation.map((alley : any, index : number)  => (
        <AlleyTitle key={index}>
            {alley}
        </AlleyTitle>
      ))}
    </AlleyCardWrapper>
  );
};

export default AlleyCard;

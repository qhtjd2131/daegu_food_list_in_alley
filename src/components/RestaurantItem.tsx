import styled from "styled-components/macro";
import React, { useCallback, useState } from "react";
import { IMenu } from "./RestaurantList";
import { buttonRender } from "./LocationCard";

//styled
const RestaurantBox = styled.div``;

const RestaurantTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #ececec;
  }
  cursor: pointer;
`;
const RestaurantName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
  margin: 0;
  padding: 0.5rem 0;
`;

const MenuBox = styled.div<{ isOpen: boolean }>`
  background-color: white;
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "200rem" : "0rem")};
  transition: 1.2s ;
`;

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

//interface
interface IRestaurantItemProps {
  restaurantName: string;
  menu: IMenu[];
}

//Component
const RestaurantItem = ({ restaurantName, menu }: IRestaurantItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const clickHandler = useCallback(() => {
    console.log("click");
    setIsOpen((bool) => {
      return !bool;
    });
  }, []);

  return (
    <RestaurantBox>
      <RestaurantTitleBox onClick={clickHandler}>
        <RestaurantName>{restaurantName}</RestaurantName>
        {buttonRender(isOpen)}
      </RestaurantTitleBox>
      <MenuBox isOpen={isOpen}>
        <Menu>
          <MenuName style={{ fontWeight: "700" }}>메뉴</MenuName>
          <Cost style={{ fontWeight: "700" }}>가격(원)</Cost>
        </Menu>
        {menu.map((menuInfo, index) => (
          <Menu key={index}>
            <MenuName>{menuInfo.menuName}</MenuName>
            <Cost>{menuInfo.cost}원</Cost>
          </Menu>
        ))}
      </MenuBox>
    </RestaurantBox>
  );
};

export default RestaurantItem;

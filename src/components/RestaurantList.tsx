import styled from "styled-components/macro";
import React from "react";
import { useLocation } from "react-router-dom";

const RestaurantList = () => {
    const a = useLocation();
    console.log(a);

    return <div>restaurant</div>
}

export default RestaurantList;
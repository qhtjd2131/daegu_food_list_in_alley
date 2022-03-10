import styled from "styled-components/macro";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoWrapper = styled.div`
    cursor : pointer;
`;

const LogoText = styled.p`
    font-size : 2rem;
`;

const Logo = () => {

    let navigate = useNavigate();
    const logoClickHandler = () => {
        navigate('/');
    }

    return <LogoWrapper onClick={logoClickHandler}>
        <LogoText>
            대구 맛집 골목 정보
        </LogoText>
    </LogoWrapper>
}

export default Logo;
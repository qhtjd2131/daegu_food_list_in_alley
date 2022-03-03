import styled from "styled-components/macro";
import React from "react";

const LogoWrapper = styled.div`
    
`;

const LogoText = styled.p`
    font-size : 2rem;
`;

const Logo = () => {

    return <LogoWrapper>
        <LogoText>
            대구 맛집 골목 정보
        </LogoText>
    </LogoWrapper>
}

export default Logo;
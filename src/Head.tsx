import styled from "styled-components/macro";
import React from "react";
import Logo from "components/Logo";
import Description from "components/Description";

//style

const HeadWrapper = styled.section`
  width: 100%;
`;
const Head = () => {
  return (
    <HeadWrapper>
      <Logo />
      <Description />
    </HeadWrapper>
  );
};

export default Head;

import styled from "styled-components";
import React from "react";
import Logo from "components/Logo";

//style

const HeadWrapper = styled.section`
  width: 100%;
`;
const Head = () => {
  return (
    <HeadWrapper>
      <Logo />
    </HeadWrapper>
  );
};

export default Head;

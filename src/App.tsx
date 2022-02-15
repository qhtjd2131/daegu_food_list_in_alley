import styled from 'styled-components';
import Head from './Head';
import Main from './Main'
import React from 'react';

//style

const GlobalWrapper = styled.div`
    width : 48rem;
    height : 100%;
    margin : 0 auto;
    border : 1px solid black;

    box-sizing : border-box;
    padding : 2rem;

    display : flex;
    flex-direction : column;
`;

function App() {
  return (
    <GlobalWrapper>

      <Head />
      <Main />
    </GlobalWrapper>    
  );
}

export default App;

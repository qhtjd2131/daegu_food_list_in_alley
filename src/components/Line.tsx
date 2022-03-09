import styled from "styled-components/macro";
import React from "react";


//styled
const OneLine = styled.div`
    width : 100%;
    height : 0.1rem;
    background-color : black;
    margin-bottom : 1rem;
`;
const TwoLine = styled.div`
    width :100%;
    height : 0.1rem;
    border-top : 0.1rem solid black;
    border-bottom : 0.1rem solid black;     
`;



//inteface

interface ILineProps {
    lineNumber : number;
}


//Component
const Line = ({lineNumber} : ILineProps) => {
    const renderLine = () => {
        if(lineNumber === 1) {
            return <OneLine />

        } else if(lineNumber === 2 ){
            return <TwoLine />
        } else{
            return <OneLine />
        }
    }
    return renderLine();
}

export default Line;
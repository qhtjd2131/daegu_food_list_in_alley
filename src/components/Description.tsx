import React from "react";
import styled from "styled-components";

const DescriptionWrapper = styled.div`

`;

const Gmail = styled.div``;
const Tel = styled.div``;
const Name = styled.div``;

const Description = () => {
    const description_data = {
        name : "최보성",
        tel : "010-3506-9552",
        gmail : "qhtjd2131@gmail.com",
    }
    return (
        <DescriptionWrapper>
            <Name>Name : {description_data.name}</Name>
            <Tel>Tel : {description_data.tel}</Tel>
            <Gmail>Mail : {description_data.gmail}</Gmail>
        </DescriptionWrapper>

    )
}

export default Description;
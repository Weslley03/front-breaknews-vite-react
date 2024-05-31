import styled from "styled-components";

export const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 0.3rem;
    background-color: #fff;
    padding: 2rem;
`;

export const CardBody = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    div {
        display: flex;
        align-items: center;
    }

    h2{
        margin-bottom: 1rem;
    }

    img {
        width: 30%;
        object-fit: cover;
        object-position: center;
    }
`;

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 1rem;

    div {
        display: flex;
        align-items: center;
        gap: 0.2    rem;
    }
`
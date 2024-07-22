import styled from "styled-components";

export const HomeBody = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 1rem auto;
    width: 65%;
`;

export const HomeHeader = styled.section`
    width: 65%;
    display: flex;
    margin: 1rem auto;
`

export const PaginButton = styled.div`
    display: 'flex';
    text-align: center;
    
    button{
        padding: 0.5rem;
        margin: 0.5rem;
    }
`
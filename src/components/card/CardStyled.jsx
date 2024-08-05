import styled from "styled-components";

export const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 0.3rem;
    background-color: #fff;
    padding: 1rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const CardHeader = styled.article`
    display:  flex;
    flex-direction: column;
    width: 100%;
    font-size: ${(props) => (props.$top ? "1.5rem" : "0.9rem")};

    h2{
        margin-bottom: 1rem;
        font-size: ${(props) => (props.$top ? "2.5rem" : "1.1rem")};
        width: 100%;

        color: #191919;
        cursor: pointer;
    }   

    i{
        cursor: pointer;
        color: #191919;
        font-size: 1.1rem;
        text-decoration: none;
        border: none;
    }

    span{
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        flex-direction: row;
        text-decoration: none   ;
    }

    a {
    text-decoration: none;
  }
`

export const CardBody = styled.article`
    display: flex;
    width: 100%;
    height: 100%;

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.5rem;
        width: 100%;
    }

    img {
        width: 40%;
        max-height: 210px;
        object-fit: cover;
        object-position: center;
        border-radius: 0 .3rem .3rem 0;
    }

    @media (max-width: 768px) {
        flex-direction: column;

        img {
            width: 100%;
            max-height: 10000px;
            border-radius: 0 0 .3rem .3rem;
            
        }

        div{
            padding: 0.2rem;
        }
    }
`;

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 1rem;

    section {
        display: flex;
        align-items: center;
        gap: 0.2    rem;
        cursor: pointer;
    }
`
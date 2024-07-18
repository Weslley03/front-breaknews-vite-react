import styled from "styled-components";

export const Header = styled.section`
    display: grid;
    grid-gap: 10px;
    margin: 1rem auto;
    width: 65%;
`

export const SectionComments = styled.section`

`

export const Container = styled.section`
    display: grid;
    margin: 1rem auto;
    width: 65%;
`

export const ProfileUserRead = styled.div`
    padding: 2rem;
`

export const ProfileAvatarRead = styled.img`
    border-radius: 50%;
    width: 2rem;
    border: solid 2px #fff;
    object-fit: cover;
    //object-position: center;
`

export const CaixaComentario = styled.div`
    display: flex;
    grid-template-columns:auto;
    align-items: center;

    h3{
        font-size: 12px;
        margin-left: 3px;
    }
`

export const CaixaTexto = styled.div`

`
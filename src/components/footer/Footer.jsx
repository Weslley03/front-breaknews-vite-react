import { Link } from "react-router-dom";
import { FooterContainer } from "./FooterStyled";

export default function Footer (){
    return(
        <>
            <FooterContainer>
                <a href="https://www.instagram.com/oweslley03/" target="_blank" >
                    <p>developed by weslley</p>
                </a>        
            </FooterContainer>
        </>
    )
}
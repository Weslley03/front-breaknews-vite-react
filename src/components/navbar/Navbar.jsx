import logo from "../../images/logomarcawf.png";
import { Button, Nav, ImagemLogo, InputSpace } from "./NavbarStyled";
    
export function Navbar() {
  return (
    <>
      <Nav>
        <InputSpace>
          <i className="bi bi-search"></i>
          <input type="text" placeholder="pesquise por um título"/>
        </InputSpace>

        <ImagemLogo src={logo} alt="logo break news"/>

        <Button>entrar</Button>
      </Nav>
    </>
  );
}

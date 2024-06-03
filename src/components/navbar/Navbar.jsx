import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/logomarcawf.png";
import { Button, Nav, ImagemLogo, InputSpace } from "./NavbarStyled";
import { useForm } from "react-hook-form";
    
export function Navbar() {

  const { register, handleSubmit, reset } = useForm()
  const nami = useNavigate()

  function onSerach(data) {
    const { title } = data  
    nami(`/search/${title}`);
    reset();
  }

  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSerach)}>  
          <InputSpace>
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
            <input {...register('title')} type="text" placeholder="pesquise por um título"/>
          </InputSpace>
        </form>
  
        <Link to={'/'}>
          <ImagemLogo src={logo} alt="logo break news"/>
        </Link>
      
        <Button>entrar</Button>
      </Nav>
      <Outlet />
    </>
  );
}

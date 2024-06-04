import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/logomarcawf.png";
import { Nav, ImagemLogo, InputSpace } from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "./NavbarStyled";
import { Button } from "../Button/Button";

const searchSchema = z.object({
  title: z.string().trim().min(1, {message: 'Por favor, preencha os dados'})
});
    
export function Navbar() {

  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: zodResolver(searchSchema)
  })
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

        <Link to={'/auth'}>
        <Button type="button" text='entrar'></Button>
        </Link>
        
      </Nav>
      {errors.title && <ErrorSpan> {errors.title.message} </ErrorSpan>}
      <Outlet />
    </>
  );
}

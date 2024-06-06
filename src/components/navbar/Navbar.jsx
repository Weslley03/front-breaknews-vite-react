import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/logomarcawf.png";
import { Nav, ImagemLogo, InputSpace, UserLoggedSpace } from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "./NavbarStyled";
import { Button } from "../Button/Button";
import { searchSchema } from "../../Schemas/SearchSchema.js";
import { userLogged } from "../../services/userServices.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Navbar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const nami = useNavigate();
  const [ user, setUser ] = useState({

  }) 

  function onSerach(data) {
    const { title } = data;
    nami(`/search/${title}`);
    reset();
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function signout(){
    Cookies.remove('token');
    setUser(undefined);
    nami('/');
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      findUserLogged();
    }
  },[]);

  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSerach)}>
          <InputSpace>
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
            <input
              {...register("title")}
              type="text"
              placeholder="pesquise por um título"
            />
          </InputSpace>
        </form>

        <Link to={"/"}>
          <ImagemLogo src={logo} alt="logo break news" />
        </Link>

        { (user) ? (
          <UserLoggedSpace>
            <Link to={'/profile'}>
              <h2>{user.userName}</h2>
            </Link>
            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <div>
            <Link to={"/welcome"}>
              <Button type="button" text="entrar"></Button>
            </Link>  
          </div>
        ) }

      </Nav>
      {errors.title && <ErrorSpan> {errors.title.message} </ErrorSpan>}
      <Outlet />
    </>
  );
}

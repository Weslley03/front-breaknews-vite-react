import { AuthContainer, Section} from "./AuthenticationStyled";
import { Input } from "../../components/InputCompo/Input";
import { Button } from "../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninSchema } from "../../Schemas/SigninSchema";
import { SignupSchema } from "../../Schemas/SignupSchema";
import { ErrorSpan } from  '../../components/navbar/NavbarStyled'
import { signup, signin } from '../../services/userServices.js'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { useState } from "react";

export function Authentication() {

  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: {errors: signupErros} } = useForm({
    resolver: zodResolver(SignupSchema)
  })

  const { register: signinRegister, handleSubmit: signinHandleSubmit, formState: {errors: signinErrors}} = useForm({
    resolver: zodResolver(SigninSchema) 
  })

  const nami = useNavigate()

  const [errorLogin, setErrorLogin] = useState('');

  async function inHandleSubmit(data){
    try{
      const response = await signin(data)
      if(response.status === 400){
        setErrorLogin(response.data.message)
      } else{
        Cookies.set('token', response.data.token, { expires: 1 })
        nami('/')
      }
    }catch(err){
      setErrorLogin(err.message)
    }
  }

  async function upHandleSubmit(data){
    try{
      const response = await signup(data);
      Cookies.set('token', response.data.tokenUser, { expires: 1 });
      nami('/');
    }catch(errorSignUp){
      setErrorSignUp('este usuario já existe');
    }
  }

  const [errorSignUp, setErrorSignUp] = useState('');

  return (  
    <AuthContainer>
      <Section type="signin">
        <h2>entrar</h2>
        <form onSubmit={signinHandleSubmit(inHandleSubmit)}>

          <Input type="email" placeholder="E-mail" name="email" register={signinRegister} autoComplete="email"/>
          {signinErrors.email && <ErrorSpan> {signinErrors.email.message} </ErrorSpan>}

          <Input type="password" placeholder="Password" autoComplete="current-password" name="password" register={signinRegister}/>
          {signinErrors.password && <ErrorSpan> {signinErrors.password.message} </ErrorSpan>}

          {errorLogin && <ErrorSpan>{errorLogin}</ErrorSpan>}

          <Button name='buttonLogin' type="submit" text="entrar"></Button>
        
        </form>
      </Section>
      <Section type="signup">
        <h2>cadastrar</h2>
        <form onSubmit={signupHandleSubmit(upHandleSubmit)}>
          <Input type="name" placeholder="Nome" name="name" register={signupRegister} autoComplete="name"/>
          {signupErros.nome && <ErrorSpan> {signupErros.nome.message} </ErrorSpan>}

          <Input type="email" placeholder="E-mail" name="email" register={signupRegister} autoComplete="email"/>
          {signupErros.email && <ErrorSpan> {signupErros.email.message} </ErrorSpan>}
          
          <Input type="password" placeholder="Password" name="password" register={signupRegister} autoComplete="new-password"/>
          {signupErros.password && <ErrorSpan> {signupErros.password.message} </ErrorSpan>}
          
          <Input type="password" placeholder="Password Confirm" name="confirmpassword" register={signupRegister} autoComplete="new-password"/>
          {signupErros.confirmpassword && <ErrorSpan> {signupErros.confirmpassword.message} </ErrorSpan>}
          
          {errorSignUp && <ErrorSpan>{errorSignUp}</ErrorSpan>}

          <Button type="submit" text="cadastrar"></Button>
        </form>
      </Section>
    </AuthContainer>
  );
}

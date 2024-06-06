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

export function Authentication() {

  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: {errors: signupErros} } = useForm({
    resolver: zodResolver(SignupSchema)
  })

  const { register: signinRegister, handleSubmit: signinHandleSubmit, formState: {errors: signinErrors}} = useForm({
    resolver: zodResolver(SigninSchema) 
  })

  const nami = useNavigate()

  async function inHandleSubmit(data){
    try{
      const response = await signin(data)
      Cookies.set('token', response.data.token, { expires: 1 })
      nami('/')
    }catch(err){
      console.log(err)
    }
  }

  async function upHandleSubmit(data){
    try{
      const response = await signup(data);
      Cookies.set('token', response.data.tokenUser, { expires: 1 });
      nami('/');
    }catch(err){
      console.log(err)
    }
  }

  return (  
    <AuthContainer>
      <Section type="signin">
        <h2>entrar</h2>
        <form onSubmit={signinHandleSubmit(inHandleSubmit)}>

          <Input type="email" placeholder="E-mail" name="email" register={signinRegister}/>
          {signinErrors.email && <ErrorSpan> {signinErrors.email.message} </ErrorSpan>}

          <Input type="password" placeholder="Password" name="password" register={signinRegister}/>
          {signinErrors.password && <ErrorSpan> {signinErrors.password.message} </ErrorSpan>}

          <Button type="submit" text="entrar"></Button>
        
        </form>
      </Section>
      <Section type="signup">
        <h2>cadastrar</h2>
        <form onSubmit={signupHandleSubmit(upHandleSubmit)}>
          <Input type="name" placeholder="Nome" name="name" register={signupRegister}/>
          {signupErros.nome && <ErrorSpan> {signupErros.nome.message} </ErrorSpan>}

          <Input type="email" placeholder="E-mail" name="email" register={signupRegister}/>
          {signupErros.email && <ErrorSpan> {signupErros.email.message} </ErrorSpan>}
          
          <Input type="password" placeholder="Password" name="password" register={signupRegister}/>
          {signupErros.password && <ErrorSpan> {signupErros.password.message} </ErrorSpan>}
          
          <Input type="password" placeholder="Password Confirm" name="confirmpassword" register={signupRegister}/>
          {signupErros.confirmpassword && <ErrorSpan> {signupErros.confirmpassword.message} </ErrorSpan>}
          
          <Button type="submit" text="cadastrar"></Button>
        </form>
      </Section>
    </AuthContainer>
  );
}

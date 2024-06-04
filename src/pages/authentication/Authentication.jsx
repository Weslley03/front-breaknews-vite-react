import { AuthContainer, Section} from "./AuthenticationStyled";
import { Input } from "../../components/InputCompo/Input";
import { Button } from "../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninSchema } from "../../Schemas/SigninSchema";
import { SignupSchema } from "../../Schemas/SignupSchema";
import { ErrorSpan } from  '../../components/navbar/NavbarStyled'


export function Authentication() {

  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: {errors: signupErros} } = useForm({
    resolver: zodResolver(SignupSchema)
  })

  const { register: signinRegister, handleSubmit: signinHandleSubmit, formState: {errors: signinErrors}} = useForm({
    resolver: zodResolver(SigninSchema) 
  })

  function inHandleSubmit(data){
    return console.log(data)
  }

  function upHandleSubmit(data){
    return console.log(data)
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
          <Input type="nome" placeholder="Nome" name="nome" register={signupRegister}/>
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

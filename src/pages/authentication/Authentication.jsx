import { AuthContainer, Section } from "./AuthenticationStyled";
import { Input } from "../../components/InputCompo/Input";
import { Button } from "../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Authentication() {

  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: {errors: signupErros} } = useForm()

  const { register: signinRegister, handleSubmit: signinHandleSubmit, formState: {errors: signinErrors}} = useForm()

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
          <Input type="password" placeholder="Password" name="password" register={signinRegister}/>
          <Button type="submit" text="entrar"></Button>
        </form>
      </Section>
      <Section type="signup">
        <h2>cadastrar</h2>
        <form onSubmit={signupHandleSubmit(upHandleSubmit)}>
          <Input type="nome" placeholder="Nome" name="nome" register={signupRegister}/>
          <Input type="email" placeholder="E-mail" name="email" register={signupRegister}/>
          <Input type="password" placeholder="Password" name="password" register={signupRegister}/>
          <Input type="password" placeholder="Password Confirm" name="ConfirmPassword"/>
          <Button type="submit" text="cadastrar"></Button>
        </form>
      </Section>
    </AuthContainer>
  );
}

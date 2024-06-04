import { AuthContainer, Section } from "./AuthenticationStyled";
import { Input } from "../../components/InputCompo/Input";
import { Button } from "../../components/Button/Button";

export function Authentication() {
  return (
    <AuthContainer>
      <Section type="signin">
        <h2>entrar</h2>
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit" text="entrar"></Button>
      </Section>
      <Section type="signup">
        <h2>cadastrar</h2>
        <Input type="nome" placeholder="Nome" name="nome" />
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Input type="ConfirmPassword" placeholder="Password Confirm" name="ConfirmPassword" />
        <Button type="submit" text="cadastrar"></Button>
      </Section>
    </AuthContainer>
  );
}

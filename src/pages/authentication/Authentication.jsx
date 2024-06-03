import { AuthContainer, Section } from "./AuthenticationStyled";

export function Authentication() {
    return(
        <AuthContainer>
            <Section type='signin'>
                <h2>entrar</h2> 
            </Section>
            <Section type='signup'>
                <h2>cadastrar</h2>
            </Section>
        </AuthContainer>
    );
}
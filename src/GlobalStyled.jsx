import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');

*{
    margin: 0;
    padding: 0;
    font-family: Newsreader, Arial;
}

html {
    width: auto;
}

body {
    max-width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
}
`;


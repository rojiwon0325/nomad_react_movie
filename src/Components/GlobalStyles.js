import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
${reset};
a{
    text-decoration: none;
    color:inherit;
}
body{
    font-size: 10px;
    background-color: black;
    color:white;
    padding-top: 50px;
}

`;
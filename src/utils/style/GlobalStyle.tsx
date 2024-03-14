import { createGlobalStyle } from "styled-components";
import '../../fonts/font.css'
//FOUT 문제를 CSS 파일 수입으로 해결


export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none; 
        text-decoration: none;
        font-family: 'Mabinogi_Classic_TTF';
    }
`;

export default GlobalStyle;

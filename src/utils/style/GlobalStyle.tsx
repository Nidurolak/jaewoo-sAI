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
  background-color: rgba(111, 195, 226);
    }

    h1, h2, h3, h4, h5, h6 {
        background-color: transparent; /* h1과 h2 요소의 배경색을 투명으로 설정 */
    }
`;

export default GlobalStyle;

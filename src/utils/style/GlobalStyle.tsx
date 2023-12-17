import { createGlobalStyle } from "styled-components";
import Mabinogi_Classic_TTF from '../../fonts/Mabinogi_Classic_TTF.ttf'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 10px;
        list-style: none; 
        text-decoration: none;
        font-family: 'Mabinogi_Classic_TTF';
    }
    @font-face{
        font-family: 'Mabinogi_Classic_TTF';
        src: local('Mabinogi_Classic_TTF'), local('Mabinogi_Classic_TTF');
        font-style: normal;
        src: url(${Mabinogi_Classic_TTF}) format('truetype');
    }
    body {
        overflow-x: hidden;
    }

`;

export default GlobalStyle;

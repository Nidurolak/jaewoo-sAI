import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from "recoil";
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, SuccessModalSet } from '../../../store/atom';



function AIMakerExplainModal() {


    return (<><Container>
    </Container></>)
}

export default AIMakerExplainModal;
const Container = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  gap: 10px;
  cursor: default;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}
  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 30px;font-family: inherit;}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: inherit;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: inherit; white-space: pre-wrap;}
`
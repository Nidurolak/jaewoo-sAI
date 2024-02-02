import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet } from '../utils/types';
import { AI_TOOL } from './AITool';
import MainButton from '../assets/MainButton.svg'
import Mainbutton3 from '../assets/MainButton3.png'
import Mainbutton800400 from '../assets/MainButton800400.png'
import 로드롤러 from '../assets/Icon/로드롤러.jpg'
import 메디이익 from '../assets/Icon/메디이익.jpg'
import 볼트서포터 from '../assets/Icon/볼트서포터.jpg'
import 블레이즈서포터 from '../assets/Icon/블레이즈서포터.jpg'
import 오리지널Lite from '../assets/Icon/오리지널Lite.jpg'
import 재우오리지널 from '../assets/Icon/재우오리지널.jpg'
import ExpProfil1 from '../assets/Icon/ExpProfil1.png'
import 전봇대 from '../assets/Icon/전봇대.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'
import 주인바라기 from '../assets/Icon/주인바라기.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, ExpWheelBool, WheelBool } from '../store/atom';
import { motion } from 'framer-motion';
 

function QNAComp(value: any){

    const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
    const [expWheelBoolstate, setexpWheelBoolState] = useRecoilState(ExpWheelBool)

    let componentToRender;

    const QNAVariant = {
      init : {y: -200, opacity: 0},
      visible : {y: 0, opacity: 1, transition: { duration: 1.5 }},
      exit: {y: -200, opacity: 0, transition: { duration: 1.5 }}
    }

    switch(expWheelBoolstate){
        case 0:
          componentToRender = <QNABox0 variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey0'>
            <QNAProfilImg image={ExpProfil1}/>
            <QNABox0TextBox>
            <h2>재우's AI란?</h2>
            <h3>마비노기 울프 서버의 ‘나는재우’가 만든 펫 AI 시리즈입니다. G20 업데이트 이후 늘어난 펫 사용량에 비해 뒤떨어지는 기본 AI를 대체하기 위해 만들어졌으며, 펫과 유저 모두의 생존성을 높여주는 특성 덕에 오랜 시간이 지난 지금까지도 여전히 현역으로 쓰이고 있습니다.</h3>
            </QNABox0TextBox>
            </QNABox0>;
          break;
        case 1:
          componentToRender = <QNABox1 variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey1'>
            <h2 style={{textAlign: 'left'}}>재우's AI는</h2>
            <QNABox1TextBox>
            <h3>유용합니다!</h3>
            <h4>유저들의 실전 데이터와 피드백을 기반으로 만들어진 재우스's AI는 단순하지만 명확한 행동패턴을 통해 전투의 흐름을 유지시켜 줍니다!</h4>
            </QNABox1TextBox>
            <QNABox1TextBox>
            <h3>간편합니다!</h3>
            <h4>설치 및 사용이 아주 간편합니다! 각 AI 시리즈가 가지고 있는 행동 패턴은 유저가 별다른 적응과정을 거칠 필요 없이 곧장 사용가능합니다! 그냥 입맛에 맞는 걸로 골라 쓰시면 됩니다!</h4>
            </QNABox1TextBox>
            <QNABox1TextBox>
            <h3>안전합니다!</h3>
            <h4>모든 재우's AI는 마비노기 인게임 AI 편집기를 통해서 만들어졌습니다! 단순한 xml 파일이기에 따로 실행하지도 않습니다!</h4>
            </QNABox1TextBox>
            
          </QNABox1>;
          break;
        case 2:
          componentToRender = <QNABox variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey2'>
            재우스 AI를 사용하는 방법
          </QNABox>;
          break;
        case 3:
          componentToRender = <QNABox variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey3'>
            세 번째 컴포넌트
          </QNABox>;
          break;
        default:
          componentToRender = <QNABox variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey4'>
            잘못된 숫자
          </QNABox>;
    }

    return(<QNAContainer key='EXPKey'>{componentToRender}</QNAContainer>)
}

export default QNAComp

const QNAContainer = styled(motion.div)`
display: flex;
align-items: center;
flex-direction: column;
align-items: center;
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: Mabinogi_Classic_TTF;}

  h2 {padding-left: 10px; color: white; font-size: 55px; font-family: inherit;}
  h3 {padding-left: 10px; font-weight: 250; color: white; font-size: 25px; font-family: inherit;}
  h4 { padding-left: 10px; font-weight: 250; color: white; font-size: 17px; font-family: inherit;}
`

const QNABox = styled(motion.div)`
`

const QNABox2Container = styled(motion.div)`
  width: 650px;
  height: 400px;
`

const QNABox1TextBox = styled(motion.div)`
display: flex;
flex-direction: column;
gap: 10px;
`

const QNABox1 = styled(motion.div)`
display: flex;
flex-direction: column;
justify-content: center;
gap: 50px;
width: 800px;
height: 500px;
background-color: rgba(255, 255, 255, 0);
color: rgba(255, 255, 255, 1);
background-image: url(${Mainbutton800400});
background: url(${Mainbutton800400});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
padding: 10px;
`

const QNABox0 = styled(motion.div)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 50px;
width: 800px;
height: 400px;
background-color: rgba(255, 255, 255, 0);
color: rgba(255, 255, 255, 1);
background-image: url(${Mainbutton800400});
background: url(${Mainbutton800400});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
padding: 10px;
`

//스크리밍 스네이크 이슈로 _ 제거
const QNABox0TextBox = styled(motion.div)`
display: flex;
align-items: center;
flex-direction: column;
align-items: center;
gap: 50px;
width: 300px;
`

const QNAProfilImg = styled.div<{image: any}>`
background-color: rgba(255, 255, 255, 0);
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 400px;
  height: 350px;
  border-radius: 15px;
`
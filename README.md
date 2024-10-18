
# 재우’s AI 다운로더 / 메이커

![jaewoo.png](jaewoo.png)

# 배포 사이트

---

[React App (jaewoo-s-ai.vercel.app)](https://jaewoo-s-ai.vercel.app/)

# **프로젝트 소개**

---

<aside>


## 📄 **재우's AI 다운로더**

- 넥슨의 게임 '마비노기'에서 유저들이 사용할 수 있는 AI 중 가장 보편적이고 고성능인 시리즈를 쉽게 이용할 수 있도록 만든 사이트입니다.
- 사용자는 재우’s AI 시리즈에 대한 핵심 정보와 편의 기능 등을 확인한 다음 코드를 복사할 수 있습니다.
- 복사된 코드는 인게임 AI 편집기에 붙여넣기하여 곧바로 적용되기에 확실하고 안전하게 사용할 수 있습니다.
</aside>

<aside>


## 📄 **재우's AI 메이커(편집기)**

- 재우’s AI 유저들이 직접 AI를 제작하거나 기존 재우’s AI를 개인 취향에 맞게 편집할 수 있는 사이트 내 추가 기능입니다.
- 인게임 편집기의 작동방식을 완벽하게 재현했으며 패턴의 목록과 세부 내용을 한 눈에 확인할 수 있도록 디자인되었습니다.
- 서버통신없이 웹상에서 코드 생성기능이 작동하기에 추가적인 인증없이 곧바로 PC방이나 새로운 컴퓨터 환경에서 자신의 AI를 편집하여 적용할 수 있습니다.
- 편집이 끝나면 다운로더와 동일한 로직으로 작동하는 코드 복사 기능을 사용하여 안전하고 쾌적하게 AI를 적용할 수 있습니다.
</aside>

# 주요기능

---

1. 재우’s AI 복사
-오랜 시간 축적된 실전 데이터를 기반으로 만들어진 재우’s AI를 무료로 안전하게 복사하는 기능 제공
2. AI 편집기
-개인 취향에 맞게 AI를 새로 만들거나 재우’s AI를 편집할 수 있는 기능 제공

# 배포 환경

---

Vercel

# 프로젝트 구조

---

<aside>

src   
├── assets  
│    ├── Icon   
│    └── Sound   
├── components   
│    ├── AIMakerTool  
│    │     ├── AIMakerButton  
│    │     │     ├── AICopyButton.tsx  
│    │     │     ├── PatternButton.tsx  
│    │     │     └── RadioButton.tsx  
│    │     ├── AIMakerToolModal  
│    │     │     ├── AIMakerExplainModal.tsx  
│    │     │     ├── CopySuccessModal.tsx  
│    │     │     ├── FirstPopupModal.tsx  
│    │     │     └── PartternChangeModal.tsx  
│    │     └── PatternEditerComps  
│    │     │     ├── ConditionMaker.tsx  
│    │     │     ├── ConSeqWraper.tsx  
│    │     │     ├── EventMaker.tsx  
│    │     │     └── SequenceMaker.tsx  
│    │     ├── AICopyList.tsx  
│    │     ├── PatternEditer.tsx  
│    │     └── PatternListMaker.tsx  
│    ├── AIButtonModal.tsx  
│    ├── AICustomModal.tsx  
│    ├── AIList.tsx  
│    ├── AIListExplainModal.tsx  
│    ├── AIMaker.tsx  
│    ├── AI_TOOL.tsx  
│    ├── ButtonComp.tsx  
│    ├── ExplainModal.tsx  
│    ├── MobileRejected.tsx  
│    ├── QNAComp.tsx  
│    └── SuccessModal.tsx  
├── fonts  
├── hooks  
│    └── AIMakerHook.tsx  
├── pages  
│    └──Main.tsx  
├── shared  
│    └──Router.tsx  
├── store  
│    └──atom.tsx  
└── utils  
       ├── style  
       ├── localStroage.tsx  
       └── types.tsx  

</aside>

# 화면 구조

---

1. **메인 화면**

![메인화면.webp](%25EB%25A9%2594%25EC%259D%25B8%25ED%2599%2594%25EB%25A9%25B4.webp)

1. **설명 화면**

![개요화면.webp](%25EA%25B0%259C%25EC%259A%2594%25ED%2599%2594%25EB%25A9%25B4.webp)

1. **AI 리스트 화면**

![리스트화면.webp](%25EB%25A6%25AC%25EC%258A%25A4%25ED%258A%25B8%25ED%2599%2594%25EB%25A9%25B4.webp)

1. **AI 설명 모달**

![설명화면.webp](%25EC%2584%25A4%25EB%25AA%2585%25ED%2599%2594%25EB%25A9%25B4.webp)

1. **AI 편집기 화면**

![편집기화면.webp](%25ED%258E%25B8%25EC%25A7%2591%25EA%25B8%25B0%25ED%2599%2594%25EB%25A9%25B4.webp)

# 개발 환경

---

React, TypeScript, Styled-Component, Framer-Motion, React-Recoil

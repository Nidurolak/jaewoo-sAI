import React from 'react';
import Router from './shared/Router';
import { isMobile } from 'react-device-detect';
import MobileRejected from './components/MobileRejected';
import './fonts/font.css'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (<>
    <Analytics />

    {isMobile ? <MobileRejected /> : <Router />}
  </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Main';

const Router = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element = {<Main />} path = "/" />
        </Routes>
        </BrowserRouter>
    )
}
export default Router;
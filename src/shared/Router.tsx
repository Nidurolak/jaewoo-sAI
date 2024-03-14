import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Main';
import { styled } from 'styled-components';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main />} path="/" />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;
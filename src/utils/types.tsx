import { type } from "os";
import React from "react";
import { ButtonHTMLAttributes } from "react";

export interface AITemplet {
    name?: string;
    explain?: string;
}

export interface StringTest {
    tabNum: number;
    main: string;
    case?: string;
    value0?: string;
    value1?: string;
    value2?: string;
}
export interface SequenceType {
    tabNum: number;
    case: string;
    main?: string;
    value0?: string;
    value1?: string;
    value2?: string;
    value3?: string;
}
export interface ConditionType {
    tabNum: number;
    case: string;
    main?: string;
    value0?: string;
    value1?: string;
}
export interface EventTypes {
    name?: string;
    main?: string;
    condition?: string[];
    sequence?: string[];
    value0?: string;
    value1?: string;
    value2?: string;
}
export interface EventTypes {
    name?: string;
    main?: string;
    condition?: string[];
    sequence?: string[];
    value0?: string;
    value1?: string;
    value2?: string;
}

export interface ButtonDataForRecoil {
    name?: string;
}

//도무지 해결이 안되네......타협을 한다.
export interface BackGUI {
    type?: string;
    //onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}
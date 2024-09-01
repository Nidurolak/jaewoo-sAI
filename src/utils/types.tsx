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
    backgroundImage?: any
    //onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export interface BoxProps {
    value: string[];
    width: number;
    sortOrder: number;
    optionValue: string;
    indexNum?: number;
    isCondition?: boolean;
    onChange: (value: string[]) => void;
}

export interface PatternType {
    key: string;
    list: AIPattern;
}

export interface AIPattern {
    name: string,
    event: string[],
    condition: string[][],
    sequence: string[][]
}
/* 
export interface TotalAIPatternList {
    value: AIPattern[]
}
*/
export interface ChangeFunc {
    apply: () => void
    cancle: () => void
}
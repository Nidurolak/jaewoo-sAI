import { type } from "os";
import React from "react";

export interface StringTest {
    tabNum : number;
    mainString : string;
    case?: string;
    valueString0? : string;
    valueString1? : string;
    valueString2? : string;
}
export interface SequenceType {
    tabNum : number;
    case : string;
    mainstring?: string;
    valueString0? : string;
    valueString1? : string;
    valueString2? : string;
    valueString3? : string;
}
export interface ConditionType {
    tabNum : number;
    case : string;
    mainstring?: string;
    valueString0? : string;
    valueString1? : string;
}
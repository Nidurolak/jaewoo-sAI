import { atom } from "recoil";
import uuid from "react-uuid";
import { ButtonDataForRecoil } from "../utils/types";

export const ButtonData = atom<ButtonDataForRecoil>({
    key:`state${uuid()}`
})

export const DownloadModalBool = atom({
    key: "DownloadMoadlState",
    default: true,
})
export const CurrentAIName = atom<string>({
    key: "CurrentAINameState",
    default: '',
})
export const ExplainModalBool = atom({
    key: "ExplainMoadlState",
    default: true,
})
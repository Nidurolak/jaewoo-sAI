import { atom } from "recoil";
import uuid from "react-uuid";
import { ButtonDataForRecoil } from "../utils/types";

export const ButtonData = atom<ButtonDataForRecoil>({
    key: `state${uuid()}`
})

export const DownloadModalCopyBool = atom({
    key: "DownloadMoadlCopyState",
    default: false,
})
export const DownloadModalBool = atom({
    key: "DownloadMoadlState",
    default: false,
})
export const CurrentAIName = atom<string>({
    key: "CurrentAINameState",
    default: '',
})
export const ExplainModalBool = atom({
    key: "ExplainMoadlState",
    default: false,
})
export const AIListExplainModalBool = atom({
    key: "AIListExplainMoadlState",
    default: false,
})
export const AIMakerExplainModalBool = atom({
    key: "AIMakerExplainMoadlState",
    default: false,
})
export const WheelBool = atom({
    key: "DownloadListBool",
    default: "Main"
})
export const ExpWheelBool = atom({
    key: "ExpListBool",
    default: 0
})
export const AIMakingEventArrayAtom = atom<string[]>({
    key: "EventAtomState",
    default: ['master', 'master_targeted', 'alert', '']
});
export const AIMakingConditionArrayAtom = atom<string[][]>({
    key: "ConditionAtomState",
    default: []
});
export const AIMakingSequenceArrayAtom = atom<string[][]>({
    key: "SequenceAtomState",
    default: []
});
/*xport const AIMakingEventArrayAtom = atom<string[][]>({
    key: "StringArrayAtomState",
    default: [
        ['',],
        ['',],
        ['',]
    ]
});*/
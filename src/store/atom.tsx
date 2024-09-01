import { atom } from "recoil";
import uuid from "react-uuid";
import { AIPattern, ButtonDataForRecoil, PatternType } from "../utils/types";

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
export const CopyAIName = atom<string>({
    key: "CopyAINameState",
    default: '',
})
export const CurrentAIName = atom<string>({
    key: "CurrentAINameState",
    default: '',
})
export const ExplainModalBool = atom({
    key: "ExplainMoadlState",
    default: false,
})
export const PatternCopyModalBool = atom({
    key: "PatternCopyModalState",
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
    default: ['master_targeted', 'alert']
});
export const AIMakingConditionArrayAtom = atom<string[][]>({
    key: "ConditionAtomState",
    default: []
});
export const AIMakingSequenceArrayAtom = atom<string[][]>({
    key: "SequenceAtomState",
    default: []
});
export const AIPatternArrayAtom = atom<PatternType[]>({
    key: "PatternAtomState",
    default: []
});

//아톰값에 들어가야할 것. 1. 패턴 인덱스 2.패턴 밸류 3. 패턴 하나 누르면 그 값으로 이벤트컨디션시퀸스 재조립
export const CurrentAIPattern = atom<{ currentIndex: number, name: string }>({
    key: "CurrentAI",
    default: { currentIndex: -1, name: "" }
    //default: { currentIndex: -1, name: "", event: [], condition: [], sequence: [] }
})

/*xport const AIMakingEventArrayAtom = atom<string[][]>({
    key: "StringArrayAtomState",
    default: [
        ['',],
        ['',],
        ['',]
    ]
});*/
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { BackGUI, ConditionType, EventTypes, SequenceType, StringTest } from "../utils/types";
import { useRecoilState, useRecoilValue } from 'recoil';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern, DownloadModalCopyBool } from '../store/atom';
import { isEqual } from 'lodash';
import clipboardCopy from 'clipboard-copy';
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'

//AI 행동 시퀸스를 조립하는 부분, 여기서 필요한 건
//cmd name
//min, max
//distance, pet+st, clockwise
//stack_magic, charge
//run, timeout이다.
//cmd name은 공통적으로 들어가지만 뒤의 벨류들은 전부 선택이다. 블로그에 경우의 수를 적어두겠다.

//행동(시퀸스)의 상세(파티클)를 만드는 기능, 한 줄의 패턴 코드를 리턴한다. seqWarper로 조립하기 전에 사용 금지
export function seqPt(value: SequenceType) {
    const resString: string[] = [];

    for (let i = 0; i < value.tabNum; i++) {
        resString.push("\t")
    }
    resString.push("<cmd name=")
    switch (value.main) {
        case "wait": resString.push(`"${value.main}" min="${value.value0}" max="${value.value1}"/>`); break;
        case "move_against": resString.push(`"${value.main}" distance="${value.value0}" run="${value.value1}" timeout="${value.value2}"/>`); break;
        case "chase": resString.push(`"${value.main}" chase_target="${value.value0}" timeout="${value.value1}" run="${value.value2}"/>`); break;
        case "move_around": resString.push(`"${value.main}" clockwise="${value.value0}" timeout="${value.value1}" run="${value.value2}"/>`); break;
        case "melee_attack": resString.push(`"${value.main}" timeout="${value.value0}"/>`); break;
        case "stackmagic_attack": resString.push(`"${value.main}" stack_magic="${value.value0}" charge="${value.value1}" timeout="${value.value2}"/>`); break;
        case "prepare_skill": resString.push(`"${value.main}" pet_skill="${value.value0}" try_cnt="${value.value1}" timeout="${value.value2}"/>`); break;
        case "stack_skill": resString.push(`"${value.main}" stack_magic="${value.value0}" charge="${value.value1}"/>`); break;
        case "process_skill": resString.push(`"${value.main}" target="${value.value0}" timeout="${value.value1}"/>`); break;
        case "cancel_skill": resString.push(`"${value.main}"/>`); break;
        case "skill_relax": resString.push(`"${value.main}" on="${value.value0}"/>`); break;
        case "PetST_skill": resString.push(`"${value.main}" pet_st="${value.value0}" timeout="${value.value1}"/>`); break;
        case "PetEQ_skill": resString.push(`"${value.main}" pet_eq="${value.value0}" timeout="${value.value1}"/>`); break;
        default: break;
    }

    return resString.join("")
}

//sePt로 나온 패턴 코드를 조립하여 집합을 만드는 기능, 이 기능을 쓸 때 sePt가 조건에 맞는지 확인 요망
export function seqWarper(value: string[]) {
    const resString: string[] = [];

    resString.push("\n\t\t<pattern>\n\t\t\t<param_decl/>\n\t\t\t<sequence>\n")
    for (let i = 0; i < value.length; i++) {
        resString.push(value[i])
        resString.push("\n")
    }
    resString.push("\t\t\t</sequence>\n\t\t</pattern>\n")
    return resString.join("")
}

//조건(컨디션)의 상세(파티클)를 만드는 기능, 한 줄의 패턴 코드를 리턴한다. conWarper 조립하기 전에 사용 금지
export function conPt(value: ConditionType) {
    const resString: string[] = [];

    for (let i = 0; i < value.tabNum; i++) {
        resString.push("\t")
    }
    resString.push("<condition name=")
    switch (value.main) {
        case "target_state": resString.push(`"${value.main}" state="${value.value0}"/>`); break;
        case "target_distance": resString.push(`"${value.main}" min_distance="${value.value0}" max_distance="${value.value1}"/>`); break;
        case "skill_preparable": resString.push(`"${value.main}" pet_skill="${value.value0}"/>`); break;
        case "ST_preparable": resString.push(`"${value.main}" pet_st="${value.value0}"/>`); break;
        case "EQ_preparable": resString.push(`"${value.main}" pet_eq="${value.value0}"/>`); break;
        case "master_damaged_life_greater": resString.push(`"${value.main}" life="${value.value0}"/>`); break;
        default: console.log(value); break;
    }

    return resString.join("")
}

//conPt로 나온 패턴 코드를 조립하여 집합을 만드는 기능, 이 기능을 쓸 때 conPt가 조건에 맞는지 확인 요망
export function conWarper(value: string[]) {
    const resString: string[] = [];

    if (value.length != 0) {
        resString.push("\n\t\t<conditions>\n")
        for (let i = 0; i < value.length; i++) {
            resString.push(value[i])
            resString.push("\n")
        }
        resString.push("\t\t</conditions>")
    }
    else resString.push("\n\t\t<conditions/>")
    return resString.join("")
}

//상황(이벤트)를 조립하는 기능, 이 기능을 쓸 때 conWarper,seqWarper가 조건에 맞는지 확인 요망
export function eventWarper(value: EventTypes) {
    const resString: string[] = [];

    resString.push(`\n\t<rule name="${value.name}">`)
    resString.push(conWarper(value.condition!))
    resString.push(seqWarper(value.sequence!))
    resString.push("\t\t<event name=")

    switch (value.main) {
        case "master_targeted": resString.push(`"${value.main}" targeting_type="${value.value0}"/>`); break;
        case "master_aimed": resString.push(`"${value.main}"/>`); break;
        case "master_target_skill_prepare": resString.push(`"${value.main}"/>`); break;
        case "master_target_magic_prepare": resString.push(`"${value.main}"/>`); break;
        case "master_defence": resString.push(`"${value.main}" defence_enable_skill="${value.value0}"/>`); break;
        case "master_attack": resString.push(`"${value.main}" master_skill="${value.value0}"/>`); break;
        case "master_attacked": resString.push(`"${value.main}" master_skill="${value.value0}" down="${value.value1}"/>`); break;
        case "master_skill_prepare": resString.push(`"${value.main}" event_skill="${value.value0}"/>`); break;
        case "seek_target": resString.push(`"${value.main}"/>`); break;
        case "now_targeting": resString.push(`"${value.main}"/>`); break;
        case "attack": resString.push(`"${value.main}" pet_attackable_skill="${value.value0}" down="${value.value1}"/>`); break;
        case "target_magic_prepare": resString.push(`"${value.main}"/>`); break;
        case "aimed": resString.push(`"${value.main}"/>`); break;
        case "target_skill_prepare": resString.push(`"${value.main}"/>`); break;
        case "defence": resString.push(`"${value.main}" defence_enable_skill="${value.value0}"/>`); break;
        case "attacked": resString.push(`"${value.main}" master_skill="${value.value0}" down="${value.value1}"/>`); break;
        case "targeted": resString.push(`"${value.main}" targeting_type="${value.value0}"/>`); break;
        default: break;
    }
    resString.push("\n\t</rule>")
    return resString.join("")
}

//이벤트, 컨디션, 시퀸스를 조립한 코드를 마감하는 기능, 텍스트 string들을 차례로 배열에 push한 다음 하나의 string으로 재조립
export function totalWarper(value: string[]) {
    const resString: string[] = [];

    resString.push("<rules>")
    for (let i = 0; i < value.length; i++) {
        resString.push(value[i])
    }
    resString.push("\n</rules>")
    return resString.join("")
}

//아톰에 개별 리스트들이 있어. 이걸 체크해야겠는데? 로대쉬를 사용해
export function CheckCurrentChange() {
    const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
    const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
    const eventArray = useRecoilValue(AIMakingEventArrayAtom);
    const conditionArray = useRecoilValue(AIMakingConditionArrayAtom);
    const sequenceArray = useRecoilValue(AIMakingSequenceArrayAtom);
    //토탈값을 어디서 체크하더라?,,,,,,,,,
    if (currentPartternValue.currentIndex >= 0) {
        //이름 변경 체크
        //아예 없는 배열을 변경사항이 있다고 착각하고 있어
        if (partternValue[currentPartternValue.currentIndex].key != currentPartternValue.name
            || !isEqual(partternValue[currentPartternValue.currentIndex].list.event, eventArray)
            || !isEqual(partternValue[currentPartternValue.currentIndex].list.condition, conditionArray)
            || !isEqual(partternValue[currentPartternValue.currentIndex].list.sequence, sequenceArray)) {// == currentPartternValue.) {

            //console.log("isChanged는 true")
            return (true)
        }
    }// console.log("isChanged는 false")
    return (false)
}

export function CheckWhatChanged(type: string) {
    const partternValue = useRecoilValue(AIPatternArrayAtom);
    const currentPartternValue = useRecoilValue(CurrentAIPattern);
    const eventArray = useRecoilValue(AIMakingEventArrayAtom);
    const conditionArray = useRecoilValue(AIMakingConditionArrayAtom);
    const sequenceArray = useRecoilValue(AIMakingSequenceArrayAtom);

    if (currentPartternValue.currentIndex > -1) {
        switch (type) {
            case "key": if (isEqual(partternValue[currentPartternValue.currentIndex].key, currentPartternValue.name) == false) return (true); break;
            case "event": if (isEqual(partternValue[currentPartternValue.currentIndex].list.event, eventArray) == false) return (true); break;
            case "condition": if (isEqual(partternValue[currentPartternValue.currentIndex].list.condition, conditionArray) == false) return (true); break;
            case "sequence": if (isEqual(partternValue[currentPartternValue.currentIndex].list.sequence, sequenceArray) == false) return (true); break;
        }

    }
    return (false)
}
export function GetWidthAndHeight(type: BackGUI) {
    switch (type.type) {
        case 'small':
            return { width: '120px', height: '30px' };
        case 'AIDown':
            return { width: '140px', height: '70px' };
        case 'normal':
            return { width: '200px', height: '70px' };
        case 'xlarge':
            return { width: '250px', height: '60px' };
        default:
            return { width: '120px', height: '30px' };
    }
};
export function HandleSoundPlay() {
    const confirmsound = new Audio(gen_button_confirm);


    const playSound = () => {
        confirmsound.currentTime = 0;
        confirmsound.play();
    };

    return playSound;
}

export function HandleCopyToClipboardForCustom(isFirst: boolean) {
    const [copied, setCopied] = useState(false);

    //const [modalBoolValue, setmodalBoolValue] = useRecoilState(DownloadModalCopyBool)

    const partternValue = useRecoilValue(AIPatternArrayAtom);
    const eventArray = useRecoilValue(AIMakingEventArrayAtom);
    const conditionArray = useRecoilValue(AIMakingConditionArrayAtom);
    const sequenceArray = useRecoilValue(AIMakingSequenceArrayAtom);

    let content: string[] = [];
    //console.log(partternValue)
    if (partternValue.length > 0) {

    }
    //setmodalBoolValue(true)

    partternValue.forEach((pattern, i) => {
        const event = pattern.list.event || [];
        const condition = pattern.list.condition || [];
        const sequence = pattern.list.sequence || [];

        //케이스가 어디갔어?!

        let con = condition.map((con) => conPt({ tabNum: 4, case: "condition", main: con[0], value0: con[1], value1: con[2] }));
        let seq = sequence.map((seq) => seqPt({ tabNum: 4, case: "sequence", main: seq[0], value0: seq[1], value1: seq[2], value2: seq[3], value3: seq[4] }));
        content.push(eventWarper({//전체포장
            name: pattern.key,
            main: event[0],
            //pt를 반복해야해
            condition: con,
            sequence: seq,
            value0: event[1],
            value1: event[2],
            value2: event[3],
        })
        )
        /**
                content.push(
                    eventWarper({
                        name: pattern.key, main: event[0] || "", // 기본값 또는 빈 값으로 설정
                        value0: event[1] || "", value1: event[2] || "", value2: event[3] || "",
                        condition: condition.length > 0
                            ? [conPt({
                                tabNum: 4,
                                case: condition[i][0] || "",
                                main: "",
                                value0: "",
                                value1: ""
                            })]
                            : [], // 비어 있을 경우 빈 배열로
                        sequence: sequence.length > 0
                            ? sequence.map((x, idx) => seqPt({
                                tabNum: 4,
                                case: "", // 필요에 따라 적절히 기본값 설정
                                main: "",
                                value0: "",
                                value1: "",
                                value2: "",
                                value3: ""
                            }))
                            : [] // 비어 있을 경우 빈 배열로
                    })
                );
            });
        
            console.log(content)
         
         */
        clipboardCopy(totalWarper(content))
            .then(() => setCopied(true))
            .catch((error) => console.error('클립보드 복사 오류:', error));

    })
}
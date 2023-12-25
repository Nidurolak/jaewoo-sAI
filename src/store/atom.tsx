import { atom } from "recoil";
import uuid from "react-uuid";
import { ButtonDataForRecoil } from "../utils/types";

export const ButtonData = atom<ButtonDataForRecoil>({
    key:`state${uuid()}`
})
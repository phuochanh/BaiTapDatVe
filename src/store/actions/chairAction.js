import { START_SELECTING, SELECT_CHAIR, CONFIRM_SELECTING } from "../types/chairType";

export const startSelectingAction = (payload) => {
    return {
        type: START_SELECTING,
        payload,
    };
};

export const selectChairAction = (payload) => {
    return {
        type: SELECT_CHAIR,
        payload,
    };
};

export const confirmSelectingAction = (payload) => {
    return {
        type: CONFIRM_SELECTING,
        payload,
    };
};

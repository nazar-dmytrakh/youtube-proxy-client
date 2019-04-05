import { CLOSE_SNACK_BAR, OPEN_SNACK_BAR } from '../actions/actionTypes';

const initialState = {
    isSnackBarOpen: false,
    snackBarMessage: '',
    snackBarType: undefined,
};

const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_SNACK_BAR:
            return {
                ...state,
                isSnackBarOpen: true,
                snackBarMessage: payload.message,
                snackBarType: payload.type || undefined,
            };
        case CLOSE_SNACK_BAR:
            return {
                ...state,
                isSnackBarOpen: false,
            };
        default:
            return state;
    }
};

export default notificationReducer;

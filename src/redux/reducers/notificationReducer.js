import { CLOSE_SNACK_BAR, OPEN_SNACK_BAR } from '../actions/actionTypes';

const initialState = {
    isSnackBarOpen: false,
    snackBarMessage: '',
};

const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_SNACK_BAR:
            return {
                ...state,
                isSnackBarOpen: true,
                snackBarMessage: payload
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

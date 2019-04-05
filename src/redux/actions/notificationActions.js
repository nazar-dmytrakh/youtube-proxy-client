import { CLOSE_SNACK_BAR, OPEN_SNACK_BAR } from './actionTypes';

export const openSnackBarAction = (data) => (
    {
        type: OPEN_SNACK_BAR,
        payload: data,
    }
);

export const closeSnackBarAction = () => (
    {
        type: CLOSE_SNACK_BAR,
    }
);

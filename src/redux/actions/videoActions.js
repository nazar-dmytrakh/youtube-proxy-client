import httpService from '../../services/httpService';

import {
    CLOSE_VIDEO_MODAL,
    FETCH_SAVED_VIDEOS_SUCCESS,
    OPEN_VIDEO_MODAL,
} from './actionTypes';
import { openSnackBarAction } from './notificationActions';

export const fetchSavedVideosSuccessAction = data => (
    {
        type: FETCH_SAVED_VIDEOS_SUCCESS,
        payload: data,
    }
);

export const openVideoModalAction = data => (
    {
        type: OPEN_VIDEO_MODAL,
        payload: data,
    }
);

export const closeVideoModalAction = () => (
    {
        type: CLOSE_VIDEO_MODAL,
    }
);

export const fetchSavedVideos = () => async (dispatch) => {
    const { data: { items } } = await httpService.fetchSavedVideos();

    dispatch(fetchSavedVideosSuccessAction(items));
};

export const saveVideo = id => async (dispatch) => {
    await httpService.saveVideo(id);
    dispatch(openSnackBarAction('Video has been successfully saved!'));
    fetchSavedVideos()(dispatch);
};

export const deleteVideo = id => async (dispatch) => {
    await httpService.deleteVideo(id);
    dispatch(openSnackBarAction('Video has been successfully deleted!'));
    fetchSavedVideos()(dispatch);
};

import {
    CLOSE_VIDEO_MODAL,
    FETCH_SAVED_VIDEOS_SUCCESS,
    OPEN_VIDEO_MODAL,
} from '../actions/actionTypes';

const initialState = {
    savedVideos: [],
    isVideoModalOpen: false,
    currentVideoId: '',
};

const videoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SAVED_VIDEOS_SUCCESS:
            return {
                ...state,
                savedVideos: payload
            };
        case OPEN_VIDEO_MODAL:
            return {
                ...state,
                currentVideoId: payload,
                isVideoModalOpen: true,
            };
        case CLOSE_VIDEO_MODAL:
            return {
                ...state,
                currentVideoId: '',
                isVideoModalOpen: false,
            };
        default:
            return state;
    }
};

export default videoReducer;

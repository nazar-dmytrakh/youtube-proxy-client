import { combineReducers } from 'redux';

import videoReducer from './videoReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    video: videoReducer,
    notification: notificationReducer,
});

export default rootReducer;

import React from 'react';
import { VideocamOff as VideocamOffIcon } from '@material-ui/icons';

import style from './style.module.scss';

const VideoEmptyState = () => (
    <div className={style.videoEmptyState}>
        <VideocamOffIcon />
    </div>
);

export default VideoEmptyState;

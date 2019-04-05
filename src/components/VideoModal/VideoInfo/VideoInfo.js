import React from 'react';
import PropTypes from 'prop-types';
import { ThumbDown as ThumbDownIcon, ThumbUp as ThumbUpIcon } from '@material-ui/icons';

import style from './style.module.scss';
import { kFormatter } from '../../../utils/helpers';

const formatViews = views => parseInt(views).toLocaleString();

const VideoInfo = ({ title, views, likes, dislikes }) => (
    <div className={style.videoInfo}>
        <div className={style.title}>{title}</div>
        <div className={style.content}>
            <div className={style.views}>{formatViews(views)} views</div>
            <div className={style.stats}>
                <ThumbUpIcon />
                <div className={style.statsItem}>{kFormatter(likes)}</div>
                <ThumbDownIcon />
                <div className={style.statsItem}>{kFormatter(dislikes)}</div>
            </div>
        </div>
    </div>
);

VideoInfo.propTypes = {
    title: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    dislikes: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
};

export default VideoInfo;

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import style from './style.module.scss';
import VideoItem from './VideoItem/VideoItem';
import VideoEmptyState from './VideoEmptyState/VideoEmptyState';

const renderVideoList = ({ data, onSaveVideo, onDeleteVideo, onOpenVideo }) => (
    data.map(({ id, title, thumbnailUrl, saved, duration }, index) => (
        <Grid key={`id-${index}`} xs={12} sm={4} md={3} item>
            <VideoItem
                onDeleteVideo={onDeleteVideo(id)}
                onSaveVideo={onSaveVideo(id)}
                title={title}
                photoUrl={thumbnailUrl}
                allowDelete={saved}
                allowSave={!saved}
                onMediaClick={onOpenVideo(id)}
                duration={duration}
            />
        </Grid>
    ))
);

const renderEmptyState = () => <VideoEmptyState />;

const VideoList = ({ data, ...rest }) => (
    <Grid className={style.container} justify="flex-start" container>
        {
            data.length
                ? renderVideoList({ data, ...rest })
                : renderEmptyState()
        }
    </Grid>
);

VideoList.defaultProps = {
    onSaveVideo: () => {},
    onDeleteVideo: () => {},
    onOpenVideo: () => {},
};

VideoList.propTypes = {
    data: PropTypes.array.isRequired,
    onSaveVideo: PropTypes.func,
    onDeleteVideo: PropTypes.func,
    onOpenVideo: PropTypes.func,
};

export default VideoList;

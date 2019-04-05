import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';

import style from './style.module.scss';

const formatDuration = duration => moment.utc(moment.duration(duration).asMilliseconds()).format("HH:mm:ss");

const VideoItem = ({ title, photoUrl, onSaveVideo, onDeleteVideo, allowDelete, allowSave, onMediaClick, duration }) => (
    <div className={style.videoItem}>
        <Card>
            <CardActionArea className={style.cardActionArea} onClick={onMediaClick}>
                <CardMedia
                    className={style.cardMedia}
                    image={photoUrl}
                    title={title}
                />
                <CardContent>
                    <div className={style.title}>{title}</div>
                </CardContent>
                <div className={style.videoDuration}>{formatDuration(duration)}</div>
            </CardActionArea>
            <CardActions>
                {
                    allowSave &&
                        <Button onClick={onSaveVideo} size="small" color="primary">
                            Save
                        </Button>
                }
                {
                    allowDelete &&
                        <Button onClick={onDeleteVideo} size="small" color="secondary">
                            Delete
                        </Button>
                }
            </CardActions>
        </Card>
    </div>
);

VideoItem.defaultProps = {
    onSaveVideo: () => {},
    onDeleteVideo: () => {},
    onMediaClick: () => {},
    allowDelete: false,
    allowSave: false,
};

VideoItem.propTypes = {
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    onSaveVideo: PropTypes.func,
    onMediaClick: PropTypes.func,
    onDeleteVideo: PropTypes.func,
    allowDelete: PropTypes.bool,
    allowSave: PropTypes.bool,
};

export default VideoItem;

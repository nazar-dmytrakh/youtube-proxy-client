import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';

import style from './style.module.scss';
import Spinner from '../Spinner/Spinner';
import VideoInfo from './VideoInfo/VideoInfo';

const VideoModal = ({ open, id, onClose, infoLoaded, title, viewCount, likeCount, dislikeCount }) => (
    <Modal className={style.modal} open={open} onClose={onClose}>
        <div className={style.modalInner}>
            {id && <iframe title="youtubeVideo" src={`https://www.youtube.com/embed/${id}`} allowFullScreen />}
            {!infoLoaded && <Spinner />}
            {infoLoaded && <VideoInfo likes={likeCount} dislikes={dislikeCount} title={title} views={viewCount} />}
        </div>
    </Modal>
);

VideoModal.defaultProps = {
    id: '',
    title: '',
    viewCount: '',
    likeCount: '',
    dislikeCount: '',
};

VideoModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
    viewCount: PropTypes.string,
    likeCount: PropTypes.string,
    dislikeCount: PropTypes.string,
    infoLoaded: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
};

export default VideoModal;

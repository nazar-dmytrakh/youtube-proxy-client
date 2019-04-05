import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.module.scss';

const getClassName = className => classnames(style.videoDuration, className);

const VideoDuration = ({ className, duration }) => (
    <div className={getClassName(className)}>{duration}</div>
);

VideoDuration.defaultProps = {
    className: '',
};

VideoDuration.propTypes = {
    className: PropTypes.string,
    duration: PropTypes.string.isRequired,
};

export default VideoDuration;

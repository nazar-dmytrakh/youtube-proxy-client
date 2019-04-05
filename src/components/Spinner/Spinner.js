import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.module.scss';
import { CircularProgress } from '@material-ui/core';

const getClassName = pageView => classnames(style.spinner, { [style.pageView]: pageView });

const Spinner = ({ pageView }) => {
    const size = pageView ? 120 : 40;

    return (
        <div className={getClassName(pageView)}>
            <CircularProgress size={size} className={style.circularProgress} disableShrink />
        </div>
    );
};

Spinner.defaultProps = {
    pageView: false,
};

Spinner.propTypes = {
    pageView: PropTypes.bool,
};

export default Spinner;

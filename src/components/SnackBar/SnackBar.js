import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
} from '@material-ui/icons';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';

import style from './style.module.scss';

const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

const iconMap = new Map([
    [SUCCESS, CheckCircleIcon],
    [ERROR, ErrorIcon],
]);

const getContentClassName = type => (
    classnames(style.snackbarContent, { [style.success]: type === SUCCESS, [style.error]: type === ERROR })
);

const SnackBar = ({ type, open, message, onClose }) => {
    const Icon = iconMap.get(type);

    return (
        <Snackbar
            open={open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <SnackbarContent
                className={getContentClassName(type)}
                message={
                    <div className={style.contentWrapper}>
                        <Icon className={style.typeIcon} />
                        {message}
                    </div>
                }
                action={
                    <IconButton
                        key="close"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Snackbar>
    )
};

SnackBar.TYPE = { SUCCESS, ERROR };

SnackBar.defaultProps = {
    type: SUCCESS,
};

SnackBar.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SnackBar;

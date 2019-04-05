import React from 'react';
import { connect } from 'react-redux';

import { closeSnackBarAction } from '../../redux/actions/notificationActions';
import SnackBar from '../../components/SnackBar/SnackBar';

const SnackBarContainer = props => (
    <SnackBar {...props} />
);

const mapStateToProps = ({ notification: { isSnackBarOpen, snackBarMessage } }) => ({
    open: isSnackBarOpen,
    message: snackBarMessage,
});

const mapDispatchToProps = {
    onClose: closeSnackBarAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer) ;

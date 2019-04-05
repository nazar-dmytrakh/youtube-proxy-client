import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoModal from '../../components/VideoModal/VideoModal';
import { closeVideoModalAction } from '../../redux/actions/videoActions';
import httpService from '../../services/httpService';

class VideoModalContainer extends Component {
    state = {
        videoInfo: {},
        infoLoaded: false,
    };

    componentDidUpdate({ open: prevOpen }) {
        const { open } = this.props;

        if (open !== prevOpen && !open) this.setState({ infoLoaded: false, });
        if (open !== prevOpen && open) this.fetchVideoInfo();
    }

    async fetchVideoInfo() {
        const { data } = await httpService.fetchVideoInfo(this.props.id);
        this.setState({ videoInfo: data, infoLoaded: true });
    }

    render() {
        const { infoLoaded, videoInfo } = this.state;
        return (
            <VideoModal {...this.props} { ...videoInfo } infoLoaded={infoLoaded} />
        );
    }
}

const mapStateToProps = ({ video: { currentVideoId, isVideoModalOpen } }) => ({
    id: currentVideoId,
    open: isVideoModalOpen,
});

const mapDispatchToProps = {
    onClose: () => closeVideoModalAction(),
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoModalContainer);

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteVideo, fetchSavedVideos, openVideoModalAction } from '../../redux/actions/videoActions';
import VideoList from '../../components/VideoList/VideoList';
import Spinner from '../../components/Spinner/Spinner';

class Library extends Component {
    static propTypes = {
        savedVideos: PropTypes.array.isRequired,
    };

    state = {
        isLoading: false,
    };

    componentDidMount() {
        this.fetchVideo();
    }

    async fetchVideo() {
        this.setState({ isLoading: true });
        await this.props.fetchSavedVideos();
        this.setState({ isLoading: false });
    }

    handleDeleteVideo = id => () => this.props.deleteVideo(id);

    handleOpenVideo = id => () => this.props.openVideoModalAction(id);

    render() {
        const { isLoading } = this.state;
        const { savedVideos } = this.props;

        return (
            <Fragment>
                {isLoading && <Spinner pageView />}
                {!isLoading && <VideoList onOpenVideo={this.handleOpenVideo} onDeleteVideo={this.handleDeleteVideo} data={savedVideos} />}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ video: { savedVideos } }) => ({
    savedVideos,
});

const mapDispatchToProps = {
    fetchSavedVideos,
    deleteVideo,
    openVideoModalAction: videoId => openVideoModalAction(videoId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);

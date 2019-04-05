import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import VideoList from '../../components/VideoList/VideoList';
import Spinner from '../../components/Spinner/Spinner';
import httpService from '../../services/httpService';
import { deleteVideo, openVideoModalAction, saveVideo } from '../../redux/actions/videoActions';
import { openSnackBarAction } from '../../redux/actions/notificationActions';
import SnackBar from '../../components/SnackBar/SnackBar';

class Trends extends Component {
    state = {
        videos: [],
        nextPageToken: '',
        isLoading: false,
        initialLoad: false,
        hasMore: true,
    };

    componentDidMount() {
        this.initialLoad();
    }

    async initialLoad() {
        await this.fetchData();
        this.setState({ initialLoad: true });
    }

    async fetchData() {
        const { videos, nextPageToken: savedNextPageToken } = this.state;
        this.setState({ isLoading: true });

        try {
            const { data: { items, nextPageToken } } = await httpService.fetchTrendVideos({ params: { page: savedNextPageToken } });
            this.setState({ videos: [...videos, ...items], nextPageToken, isLoading: false, hasMore: !!items.length });
        } catch ({ message }) {
            this.setState({ hasMore: false, isLoading: false });
            this.props.onError({ message, type: SnackBar.TYPE.ERROR });
        }
    };

    handleLoadMore = () => (
        !this.state.isLoading ? this.fetchData() : null
    );

    handleSaveVideo = videoId => () => {
        this.props.saveVideo(videoId);
        const { videos } = this.state;
        const index = videos.findIndex(({ id }) => id === videoId);
        videos[index].saved = true;
        this.setState({ videos });
    };

    handleOpenVideo = id => () => this.props.openVideoModalAction(id);

    handleDeleteVideo = videoId => () => {
        this.props.deleteVideo(videoId);
        const { videos } = this.state;
        const index = videos.findIndex(({ id }) => id === videoId);
        videos[index].saved = false;
        this.setState({ videos });
    };

    render() {
        const { videos, initialLoad, isLoading, hasMore } = this.state;

        return (
            <div>
                {!initialLoad && isLoading && <Spinner pageView />}
                {
                    initialLoad &&
                        <InfiniteScroll loader={<Spinner key="spinner" />} hasMore={hasMore} loadMore={this.handleLoadMore}>
                            <VideoList onDeleteVideo={this.handleDeleteVideo} onOpenVideo={this.handleOpenVideo} onSaveVideo={this.handleSaveVideo} data={videos} />
                        </InfiniteScroll>
                }
            </div>
        );
    }
}

const mapDispatchToProps = {
    saveVideo,
    deleteVideo,
    openVideoModalAction: videoId => openVideoModalAction(videoId),
    onError: data => openSnackBarAction(data),
};

export default connect(null, mapDispatchToProps)(Trends);

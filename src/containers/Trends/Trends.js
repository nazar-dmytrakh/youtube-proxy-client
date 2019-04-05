import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import VideoList from '../../components/VideoList/VideoList';
import Spinner from '../../components/Spinner/Spinner';
import httpService from '../../services/httpService';
import { openVideoModalAction, saveVideo } from '../../redux/actions/videoActions';

class Trends extends Component {
    state = {
        videos: [],
        nextPageToken: '',
        isLoading: false,
        initialLoad: false,
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
        const { data: { items, nextPageToken } } = await httpService.fetchTrendVideos({ params: { page: savedNextPageToken } });
        this.setState({ videos: [...videos, ...items], nextPageToken, isLoading: false });
    };

    handleLoadMore = () => {
        const { isLoading } = this.state;

        if (isLoading) return false;
        this.fetchData();
    };

    handleSaveVideo = videoId => () => {
        this.props.saveVideo(videoId);
        const newVideos = this.state.videos.map(({ id, saved , ...rest }) => {
            const result = { id, saved, ...rest };

            if (videoId === id && !saved) result.saved = true;
            return result;
        });

        this.setState({ videos: newVideos });
    };

    handleOpenVideo = id => () => this.props.openVideoModalAction(id);

    render() {
        const { videos, initialLoad, isLoading } = this.state;

        return (
            <div>
                {!initialLoad && isLoading && <Spinner pageView />}
                {
                    initialLoad &&
                        <InfiniteScroll loader={<Spinner key="spinner" />} hasMore loadMore={this.handleLoadMore}>
                            <VideoList onOpenVideo={this.handleOpenVideo} onSaveVideo={this.handleSaveVideo} data={videos} />
                        </InfiniteScroll>
                }

            </div>
        );
    }
}

const mapDispatchToProps = {
    saveVideo,
    openVideoModalAction: videoId => openVideoModalAction(videoId),
};

export default connect(null, mapDispatchToProps)(Trends);

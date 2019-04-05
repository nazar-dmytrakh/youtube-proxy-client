import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from '../../components/Spinner/Spinner';
import VideoList from '../../components/VideoList/VideoList';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import httpService from '../../services/httpService';
import {openVideoModalAction, saveVideo} from '../../redux/actions/videoActions';

class VideoSearch extends Component {
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
        await this.searchVideos();
        this.setState({ initialLoad: true });
    }

    componentDidUpdate({ location: { search: prevSearch } }) {
        const { location: { search } } = this.props;

        if (search !== prevSearch) this.setState({ videos: [], nextPageToken: '', initialLoad: false }, this.initialLoad);
    }

    getSearchName() {
        const { location: { search } } = this.props;
        const urlSearchParams = new URLSearchParams(search);

        return urlSearchParams.get('name');
    }

    async searchVideos() {
        const { videos, nextPageToken: savedNextPageToken } = this.state;
        const name = this.getSearchName();

        this.setState({ isLoading: true });
        const { data: { items, nextPageToken } } = await httpService.searchVideos({ params: { name, page: savedNextPageToken } });
        this.setState({ videos: [...videos, ...items], nextPageToken, isLoading: false });
    }

    handleLoadMore = () => {
        const { isLoading } = this.state;

        if (isLoading) return false;
        this.searchVideos();
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
                {initialLoad && <SearchHeader name={this.getSearchName()} />}
                {!initialLoad && isLoading && <Spinner pageView />}
                {
                    initialLoad &&
                        <InfiniteScroll loader={<Spinner key="spinner" />} hasMore loadMore={this.handleLoadMore}>
                            <VideoList onOpenVideo={this.handleOpenVideo} onSaveVideo={this.handleSaveVideo} data={videos} />
                        </InfiniteScroll>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    saveVideo,
    openVideoModalAction: video => openVideoModalAction(video),
};

export default withRouter(connect(null, mapDispatchToProps)(VideoSearch));

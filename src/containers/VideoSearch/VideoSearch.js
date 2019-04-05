import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from '../../components/Spinner/Spinner';
import VideoList from '../../components/VideoList/VideoList';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import httpService from '../../services/httpService';
import { deleteVideo, openVideoModalAction, saveVideo } from '../../redux/actions/videoActions';
import SnackBar from '../../components/SnackBar/SnackBar';
import {openSnackBarAction} from '../../redux/actions/notificationActions';

class VideoSearch extends Component {
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

    componentDidUpdate({ location: { search: prevSearch } }) {
        const { location: { search } } = this.props;

        if (search !== prevSearch) this.setState({ videos: [], nextPageToken: '', initialLoad: false }, this.initialLoad);
    }

    async initialLoad() {
        await this.searchVideos();
        this.setState({ initialLoad: true });
    }

    getSearchName() {
        const { location: { search } } = this.props;
        const urlSearchParams = new URLSearchParams(search);

        return urlSearchParams.get('name');
    }

    async searchVideos() {
        const { history } = this.props;
        const { videos, nextPageToken: savedNextPageToken } = this.state;
        const name = this.getSearchName();

        if (!name) return history.replace('/');

        try {
            const { data: { items, nextPageToken } } = await httpService.searchVideos({ params: { name, page: savedNextPageToken } });
            this.setState({ videos: [...videos, ...items], nextPageToken, isLoading: false, hasMore: !!items.length });
        } catch ({ message }) {
            this.setState({ hasMore: false, isLoading: false });
            this.props.onError({ message, type: SnackBar.TYPE.ERROR });
        }
    }

    handleLoadMore = () => {
        const { isLoading } = this.state;

        if (isLoading) return false;
        this.searchVideos();
    };

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
                {initialLoad && <SearchHeader name={this.getSearchName()} />}
                {!initialLoad && isLoading && <Spinner pageView />}
                {
                    initialLoad &&
                        <InfiniteScroll loader={<Spinner key="spinner" />} hasMore={hasMore} loadMore={this.handleLoadMore}>
                            <VideoList onDeleteVideo={this.handleDeleteVideo} onOpenVideo={this.handleOpenVideo} onSaveVideo={this.handleSaveVideo} data={videos} />
                        </InfiniteScroll>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    saveVideo,
    deleteVideo,
    openVideoModalAction: video => openVideoModalAction(video),
    onError: data => openSnackBarAction(data),
};

export default withRouter(connect(null, mapDispatchToProps)(VideoSearch));

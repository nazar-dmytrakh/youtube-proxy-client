import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import store from './redux/store';
import Header from './components/Header/Header';
import Trends from './containers/Trends/Trends';
import Library from './containers/Library/Library';
import VideoSearch from './containers/VideoSearch/VideoSearch';
import SnackBarContainer from './containers/SnackBarContainer/SnackBarContainer';
import VideoModalContainer from './containers/VideoModalContainer/VideoModalContainer';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <VideoModalContainer />
                    <SnackBarContainer />

                    <Route exact path="/" render={() => <Redirect to="/trends" />} />
                    <Route path="/trends" exact component={Trends} />
                    <Route path="/library" exact component={Library} />
                    <Route path="/search" exact component={VideoSearch} />
                </Router>
            </Provider>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import style from './style.module.scss';
import Navigation from './Navigation/Navigation';
import SearchBlock from './SearchBlock/SearchBlock';
import MobileNavigation from './MobileNavigation/MobileNavigation';

class Header extends Component {
    state = {
        searchValue: '',
        isMobileMenuOpen: false,
        isSidebarOpen: false,
    };

    componentDidUpdate({ location: { pathname: prevPathname } }) {
        const { location: { pathname } } = this.props;

        if (prevPathname !== pathname) this.setState({ isMobileMenuOpen: false });
    }

    toggleSidebar = () => this.setState({ isSidebarOpen: !this.state.isSidebarOpen });

    handleSearchSubmit = (event) => {
        event.preventDefault();
        const { history } = this.props;
        const { searchValue } = this.state;

        if (!searchValue) return;

        history.push(`/search?name=${searchValue}`);
        this.setState({ searchValue: '' });
    };

    handleSearchChange = ({ target: { value } }) => this.setState({ searchValue: value });

    render() {
        const { searchValue, isSidebarOpen } = this.state;

        return (
            <div className={style.header}>
                <AppBar position="static" className={style.appBar} color="primary">
                    <Link className={style.logo} to="/">V-LIBRARY</Link>
                    <IconButton onClick={this.toggleSidebar} className={style.burgerButton}>
                        <MenuIcon />
                    </IconButton>
                    <div className={style.actions}>
                        <SearchBlock
                            onChange={this.handleSearchChange}
                            value={searchValue}
                            onSubmit={this.handleSearchSubmit}
                            className={style.searchBlock}
                        />
                        <Navigation className={style.navigation} />
                    </div>
                </AppBar>
                <MobileNavigation isOpen={isSidebarOpen} onClose={this.toggleSidebar} />
            </div>
        );
    }
}

export default withRouter(Header);

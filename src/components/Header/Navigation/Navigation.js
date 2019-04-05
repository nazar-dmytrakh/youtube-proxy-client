import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './style.module.scss';

const getClassName = className => (
    classnames(style.nav, className)
);

const Navigation = ({ className }) => (
    <nav className={getClassName(className)}>
        <NavLink exact activeClassName={style.activeLink} to="/trends">Trends</NavLink>
        <NavLink exact activeClassName={style.activeLink} to="/library">My Library</NavLink>
    </nav>
);

Navigation.defaultProps = {
    className: '',
};

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;

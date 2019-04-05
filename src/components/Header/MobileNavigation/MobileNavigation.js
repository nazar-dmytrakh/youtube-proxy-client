import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem } from '@material-ui/core';

import style from './style.module.scss';
import {NavLink} from 'react-router-dom';

const MobileNavigation = ({ isOpen, onClose }) => (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <List>
            <ListItem className={style.listItem} button>
                <NavLink exact activeClassName={style.activeLink} to="/trends">Trends</NavLink>
            </ListItem>
            <ListItem className={style.listItem} button>
                <NavLink exact activeClassName={style.activeLink} to="/library">My Library</NavLink>
            </ListItem>
        </List>
    </Drawer>
);

MobileNavigation.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MobileNavigation;

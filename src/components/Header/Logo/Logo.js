import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

const Logo = () => (
    <Link className={style.logo} to="/">V-LIBRARY</Link>
);

export default Logo;

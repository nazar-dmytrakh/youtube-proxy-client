import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import style from './style.module.scss';

const getClassName = className => (
    classnames(style.searchBlock, className)
);

const SearchBlock = ({ className, value, onChange, onSubmit }) => (
    <div className={getClassName(className)}>
        <form onSubmit={onSubmit}>
            <button type="submit" className={style.searchButton}>
                <SearchIcon />
            </button>
            <InputBase
                className={style.inputWrapper}
                onChange={onChange}
                value={value}
                inputProps={{ className: style.input }}
                placeholder="Search…"
            />
        </form>
    </div>
);

SearchBlock.defaultProps = {
    className: '',
};

SearchBlock.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBlock;

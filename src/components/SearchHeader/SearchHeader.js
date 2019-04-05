import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const SearchHeader = ({ name }) => (
  <div className={style.searchHeader}>
      Search result for: <span>{name}</span>
  </div>
);

SearchHeader.propTypes = {
    name: PropTypes.string.isRequired,
};

export default SearchHeader;

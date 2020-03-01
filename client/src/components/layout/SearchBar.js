import React, { useState } from 'react';
import PropTypes from 'prop-types'


// Redux
import { connect } from 'react-redux';

import { searchLogs, clearFiltered } from '../../actions/logActions';


const SearchBar = (props) => {

  const { searchLogs } = props;
  const { clearFiltered } = props;

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);

    if(e.target.value === ''){
      clearFiltered()
    }else {
      searchLogs(text);

    }

  }

  return (
    <nav style={{ marginBottom: '30px' }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input onChange={onChange} value={text} id="search" type="search" />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  )
}

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
}

export default connect(null, { searchLogs, clearFiltered })(SearchBar)

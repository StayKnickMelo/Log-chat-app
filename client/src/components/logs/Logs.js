import React, { useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types'


import { connect } from 'react-redux';
import {getLogs} from '../../actions/logActions';


const Logs = (props) => {


  const {logs, loading, filtered} = props.log;
  const {getLogs} = props

  useEffect(() => {

    getLogs();
    //eslint-disable-next-line
  }, []);

 

  if (loading || logs === null) {
    return <Preloader />
  }

  return (
    <ul className='collection with-header'>
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {filtered ? 
        (filtered.map(log => (<LogItem key={log._id} log={log} />))) : !loading && logs.length === 0 ? (<p className='center'>No Logs to Show...</p>) :
          (logs.map(log => (<LogItem key={log._id} log={log} />))) }
    </ul>
  )
};

const mapStateToProps = (state) => ({
  log: state.log
});

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getLogs})(Logs);


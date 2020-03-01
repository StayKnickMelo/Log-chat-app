import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import M from 'materialize-css';


// Redux
import { connect } from 'react-redux'
import { deleteLog } from '../../actions/logActions'
import { setCurrent } from '../../actions/logActions';

const LogItem = (props) => {

  const { log } = props;
  const { deleteLog } = props;
  const { setCurrent } = props;

  const onClick = () => {
    setCurrent(log);

  }

  const onDelete = () => {
    deleteLog(log._id);
    M.toast({ html: 'Log Deleted' });

  }

  return (
    <li className='collection-item '>
      <div >
        <a onClick={onClick} href="#edit-log-modal" className={`modal-trigger ${log.attention && 'red-text'}`}>{log.message}</a>
        <span className="grey-text">
          <br />
          <span className="black-text customBadge">ID #{log.idNum} </span>
          last updated by
          <span className='black-text'> {log.tech} </span>
          on <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span>
          <a onClick={onDelete} href="#!" className=" secondary-content">
            <i className="material-icons red-text">delete</i>
          </a>
      </div>
    </li>
  )
}

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
}

export default connect(null, { deleteLog, setCurrent })(LogItem)

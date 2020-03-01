import React, { useState, useEffect, useRef } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import TechOptions from '../techs/TechOptions';


// Redux
import { connect } from 'react-redux';
import {updateLog} from '../../actions/logActions';
import {clearCurrent} from '../../actions/logActions';




const EditLogModel = (props) => {

  const { current } = props;
  const {updateLog} = props;
  const {clearCurrent} = props;

  const [log, setLog] = useState({
    message: '',
    tech: ''
  });

  const input = useRef()

  useEffect(() => {

    if (current) {
      setLog({
        message: current.message,
        tech: current.tech
      });

      setAttention(current.attention);

      input.current.focus();

    }
    //eslint-disable-next-line
  },[current])

  


  const { message, tech } = log;

  const [attention, setAttention] = useState(false);


  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });

  }

  const onSubmit = () => {

    if (message === '' || tech === '') {
      M.toast({ html: 'Please fill in all fields' });
    } else {

      updateLog(current._id, {tech, message, attention});
      clearCurrent();

      setLog({
        message: '',
        tech: ''
      });

      setAttention(false);
    }
  }



  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input ref={input} type="text" name="message" value={message} onChange={onChange} />
            <label className='active' htmlFor="message">Log Message</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select className='browser-default' name="tech" value={tech} onChange={onChange}>
              <option value="" disabled>Select Technician</option>
              <TechOptions/>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input className="filled-in" type="checkbox" checked={attention} value={attention} onChange={(e) => setAttention(!attention)} />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="modal-close waves-effect blue btn" href="#!" onClick={onSubmit} >Enter</a>
      </div>
    </div>

  )
}

const modalStyle = {
  width: '75%',
  height: '75%'
}

const mapStateToProps = (state) => ({
  current: state.log.current

});

EditLogModel.propTypes = {
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {updateLog, clearCurrent})(EditLogModel)

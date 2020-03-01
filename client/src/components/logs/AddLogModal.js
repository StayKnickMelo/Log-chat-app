import React, { useState } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

import TechOptions from '../techs/TechOptions';


// Redux
import { connect } from 'react-redux';
import { addLog } from '../../actions/logActions';


const AddLogModal = (props) => {

  const { addLog } = props;
  const {logs} = props;
  
  const [log, setLog] = useState({
    message: '',
    tech: ''
  });

  const { message, tech } = log;

  const [attention, setAttention] = useState(false)

  const onChange = (e) => {

    setLog({ ...log, [e.target.name]: e.target.value });

  }

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });

    } else {

      const idNum = logs.length + 1;
      console.log(idNum);

      addLog({ message, tech, attention, date: new Date(), idNum });
      M.toast({ html: `Log Added by ${tech}` });

      setLog({
        message: '',
        tech: ''
      })

      setAttention(false)
    }

  }


  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="message" value={message} onChange={onChange} />
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



AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  // techs: state.tech.techs,
  logs: state.log.logs
})


export default connect(mapStateToProps, { addLog })(AddLogModal)

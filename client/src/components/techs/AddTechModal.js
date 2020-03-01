import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';


// Redux
import { connect } from 'react-redux';
import { addTech, clearError } from '../../actions/techActions';

const AddTechModal = (props) => {

  const { addTech, clearError } = props;
  const { error } = props.tech;
  const { techs } = props.tech

  


  useEffect(() => {
    if (error) {
      M.toast({ html: error });
      clearError();
    }
    // eslint-disable-next-line
  }, [error]);

  const [tech, setTech] = useState({
    firstName: '',
    lastName: ''
  });

  const { firstName, lastName } = tech;

  const onChange = (e) => {
    setTech({ ...tech, [e.target.name]: e.target.value })

  }

  const onSubmit = () => {

    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please fill in technician info' });

    } else if (techs.filter(tech => tech.lastName === lastName)) {
      addTech(tech);

    } else {
      addTech(tech);
      M.toast({ html: `${firstName} ${lastName} was added` })

      setTech({
        firstName: '',
        lastName: ''
      })
    }

  }




  return (
    <div id='add-tech-modal' className='modal'>
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="firstName" value={firstName} onChange={onChange} />
            <label className='active' htmlFor="firstName">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="lastName" value={lastName} onChange={onChange} />
            <label className='active' htmlFor="lastName">Last Name </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="modal-close waves-effect blue btn" href="#!" onClick={onSubmit} >Add Technician</a>
      </div>
    </div>
  )
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  tech: state.tech
})


export default connect(mapStateToProps, { addTech, clearError })(AddTechModal)

import React, { useEffect } from 'react';
import TechItem from './TechItem';
import PropTypes from 'prop-types'



// Redux
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';


const TechListModal = (props) => {

  const { techs, loading } = props.tech;
  const { getTechs } = props;


  useEffect(() => {
    getTechs()
    // eslint-disable-next-line
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading && techs !== null && techs.map(tech => (<TechItem key={tech._id} tech={tech} />))}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  tech: state.tech
})

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default connect(mapStateToProps, { getTechs })(TechListModal);

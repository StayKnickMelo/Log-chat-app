import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';



const TechItem = ({ tech, deleteTech }) => {

  const onClick = () => {
    deleteTech(tech._id);
  }


  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a onClick={onClick} className='secondary-content' href="#!">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  )
}

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
}



export default connect(null, { deleteTech })(TechItem)

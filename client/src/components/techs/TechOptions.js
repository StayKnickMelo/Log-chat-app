import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {getTechs} from '../../actions/techActions';

const TechOptions = (props) => {

  useEffect(()=>{
    getTechs()
    // eslint-disable-next-line
  },[]);

  const {techs, loading} = props.techs;
  const {getTechs} = props

  return (
  !loading && techs !== null && techs.map(tech=> (<option key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>{tech.firstName} {tech.lastName}</option>))
  )
}


const mapStateToProps = (state) => ({
  techs: state.tech
})

export default connect(mapStateToProps, {getTechs}) (TechOptions)

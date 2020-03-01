import React, { useEffect, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './App.css';


// Components
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModel from './components/logs/EditLogModel';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';

// Redux
import {Provider} from 'react-redux';
import store from './store';

const App = () => {

  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();

  })

  return (
    <Provider store={store}>
    <Fragment >
      <SearchBar/>
      <div className="container">
      <AddBtn/>
      <AddLogModal/>
      <EditLogModel/>
      <AddTechModal/>
      <TechListModal/>
      <Logs/>
      </div>
    </Fragment>
    </Provider>
  );
}

export default App;

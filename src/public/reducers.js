import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { globalReducers } from '../models/global';
import { agentReducers } from '../pages/Index/models';
// import { settingReducer } from '../models/setting'

const appReducer = combineReducers({
  routing,
  global: globalReducers,
  agent: agentReducers,
  // setting: settingReducer
});

export default appReducer;

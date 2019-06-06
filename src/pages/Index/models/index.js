import mirror from "mirror-creator";
import { message } from 'antd';
import { getAgent, } from '../services/api';

/**
 * constants
 */
const actionType =  mirror([
  'GET_AGENTS',
], {prefix: 'agents'});


/**
 * 初始化 state
 */
const initState = {
  agents: {},
};

/**
 * 全局action
 */
export const agentAction = {

  fetchAgent (payload) {
    return async (dispatch) => {
      const { result, result_message, data} = await getAgent(payload);
      if (!result) {
        return message.error(result_message)
      }
      dispatch({
        type: actionType.GET_AGENTS,
        payload: data
      })
    }
  },

};

/**
 * 全局reducer
 * @param {*} state 
 * @param {*} action 
 */
export const agentReducers = (state=initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.GET_AGENTS: {
      return {
        ...state,
        agents: payload,
      };
    }
    default: return state;
  }
};
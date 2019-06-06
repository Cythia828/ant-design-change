import mirror from "mirror-creator";
import { message } from 'antd';
import { queryNavigation, queryCurrentUser, queryUsers } from '@/services/api';

/**
 * constants
 */
const actionType =  mirror([
  'QUERY_NAVIGATION',
  'QUERY_USERS',
  'CURRENT_USER',
  'COLLAPSED',
], {prefix: 'global'});

/**
 * 初始化 state
 */
const initState = {
  collapsed: false,
  navigation: [],
  userList: [],
  userInfo: {}
};

/**
 * 全局action
 */
export const globalAction = {

  getNavigation (payload) {
    return async (dispatch) => {
      const { result, result_message, data} = await queryNavigation(payload);
      if (!result) {
        return message.error(result_message)
      }
      dispatch({
        type: actionType.QUERY_NAVIGATION,
        payload: data
      })
    }
  },

  fetchUsers(payload) {
    return async dispatch => {
      const { result, result_message, data} = await queryUsers(payload);
      if (!result) {
        return message.error(result_message)
      }
      dispatch({
        type: actionType.QUERY_USERS,
        payload: data
      })
    }
  },

  fetchCurrentUser(payload) {
    return async dispatch => {
      const { result, result_message, data} = await queryCurrentUser(payload);
      if (!result) {
        return message.error(result_message)
      }
      dispatch({
        type: actionType.CURRENT_USER,
        payload: data
      })
    }
  },

  changeCollapsed(payload) {
    return {
      type: actionType.COLLAPSED,
      payload
    }
  }
};

/**
 * 全局reducer
 * @param {*} state 
 * @param {*} action 
 */
export const globalReducers = (state=initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.QUERY_NAVIGATION: {
      return {
        ...state,
        navigation: payload,
      };
    }
    case actionType.QUERY_USERS: {
      return {
        ...state,
        userList: payload,
      };
    }
    case actionType.CURRENT_USER: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case actionType.COLLAPSED: {
      return {
        ...state,
        collapsed: payload,
      };
    }
    default: return state;
  }
};

  

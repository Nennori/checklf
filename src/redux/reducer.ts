import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from './actionTypes';
import { UserAction } from '../assets/types';

const user = localStorage.getItem('user');

const initialState = user ? { isLoggedIn: true, user: JSON.parse(user) } : { isLoggedIn: false, user: null };

export default function reducer(state = initialState, action: UserAction) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case REFRESH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

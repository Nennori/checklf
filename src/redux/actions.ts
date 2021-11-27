/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectAdvanced } from 'react-redux';
import { idText } from 'typescript';
import * as actionTypes from './actionTypes';
import { User } from '../assets/interfaces';
import { UserAction, DispatchType } from '../assets/types';
import { authRefreshHeader, authAccessHeader } from './header';
import store from './store';

export function login(user: { email: string; password: string }) {
  return fetch('http://localhost:80/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      store.dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: null,
      });
      const error = new Error(response.statusText);
      console.log('error auth');
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify({ name: data.data.name }));
      localStorage.setItem(`${data.data.name}_refresh`, data.data.refresh_token);
      localStorage.setItem(`${data.data.name}_access`, data.data.access_token);
      store.dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { name: data.data.name },
      });
    });
}

export function register(user: { name: string; email: string; password: string; passwordConfirmation: string }) {
  return fetch('http://localhost:80/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      }
      store.dispatch({
        type: actionTypes.REGISTER_FAIL,
        payload: null,
      });
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify({ name: data.data.name }));
      localStorage.setItem(`${data.data.name}_refresh`, data.data.refresh_token);
      localStorage.setItem(`${data.data.name}_access`, data.data.access_token);
      store.dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: { name: data.data.name },
      });
    });
}

export function logout() {
  const userData = localStorage.getItem('user');
  if (userData !== null) {
    const user = JSON.parse(userData);
    const refreshToken = localStorage.getItem(`${user.name}_refresh`);
    const accessToken = localStorage.getItem(`${user.name}_access`);
    if (accessToken !== null && refreshToken !== null) {
      fetch('http://localhost:80/api/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ access_token: accessToken }),
      });
    }
    localStorage.removeItem('user');
    localStorage.removeItem(`${user.name}_refresh`);
    localStorage.removeItem(`${user.name}_access`);
    store.dispatch({
      type: actionTypes.LOGOUT,
      payload: null,
    });
  }
}

export function refresh() {
  return fetch('http://localhost:80/api/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authRefreshHeader()}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      store.dispatch({
        type: actionTypes.REFRESH_FAIL,
        payload: null,
      });
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify({ name: data.data.name }));
      localStorage.setItem(`${data.data.name}_refresh`, data.data.refresh_token);
      localStorage.setItem(`${data.data.name}_access`, data.data.access_token);
      store.dispatch({
        type: actionTypes.REFRESH_SUCCESS,
        payload: { name: data.data.name },
      });
    });
}

export function getChecklists() {
  return fetch('http://localhost:80/api/checklist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function addChecklist(checklist: { name: string }) {
  return fetch('http://localhost:80/api/checklist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
    body: JSON.stringify({
      name: checklist.name,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function updateChecklist(checklist: { id: number; name: string }) {
  return fetch(`http://localhost:80/api/checklist/${checklist.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
    body: JSON.stringify({
      name: checklist.name,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function getChecklist(checklist: { id: number }) {
  return fetch(`http://localhost:80/api/checklist/${checklist.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function deleteChecklist(checklist: { id: number }) {
  return fetch(`http://localhost:80/api/checklist/${checklist.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
  }).then((response) => {
    if (response.status === 204) {
      return response;
    }
    const error = new Error(response.status.toString());
    throw error;
  });
}

export function addTask(checklist: { id: number; task: { content: string; checked: boolean } }) {
  return fetch(`http://localhost:80/api/checklist/${checklist.id}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
    body: JSON.stringify({
      content: checklist.task.content,
      done: checklist.task.checked,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function updateTask(task: { id: number; content: string; checked: boolean }) {
  return fetch(`http://localhost:80/api/checklist/task/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
    body: JSON.stringify({
      content: task.content,
      done: task.checked,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.status.toString());
      throw error;
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    });
}

export function deleteTask(id: number) {
  return fetch(`http://localhost:80/api/checklist/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authAccessHeader()}`,
    },
  }).then((response) => {
    if (response.status === 204) {
      return response;
    }
    const error = new Error(response.status.toString());
    throw error;
  });
}

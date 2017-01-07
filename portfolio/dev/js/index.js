import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './reducers'
import App from './components/App'
import Sw from './sw/app'
import BackButton from './back-button'

const middleware = [ thunk ]
const store = createStore(
  allReducers,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

import React from 'react'
import { render } from 'react-dom'
import './styles/index.css';

import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const store = createStore(reducer, enhancers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

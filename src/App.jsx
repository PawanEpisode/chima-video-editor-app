import React from 'react';

import store from './store/globalStore.js';
import { Routers } from './routes/index.js'
import { Provider } from 'react-redux'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  )
}

export default App

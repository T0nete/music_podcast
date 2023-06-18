import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App.jsx"
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/index'

ReactDOM.render( 
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root') 
);
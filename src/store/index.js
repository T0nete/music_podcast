import {configureStore} from '@reduxjs/toolkit'
import podcastReducer from './podcastSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
    reducer: {
        podcast: podcastReducer,
        loading: loadingReducer
    }
})
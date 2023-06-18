import {configureStore} from '@reduxjs/toolkit'
import podcastReducer from './podcastSlice'

export const store = configureStore({
    reducer: {
        podcast: podcastReducer
    }
})
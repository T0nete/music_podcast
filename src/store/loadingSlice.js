import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            return action.payload
        }
    }
})

export default loadingSlice.reducer
export const {setLoadingState} = loadingSlice.actions
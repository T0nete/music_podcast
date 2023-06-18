import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    image: '', 
    title: '', 
    author: '', 
    description: ''
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        setPodcastDetailState: (state, action) => {
            const {image, title, author, description} = action.payload
            console.log(action.payload)
            state.image = image
            state.title = title
            state.author = author
            state.description = description

            return state
        }
    }
})

export default podcastSlice.reducer
export const {setPodcastDetailState} = podcastSlice.actions
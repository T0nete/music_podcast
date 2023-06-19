import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    image: '', 
    title: '', 
    author: '', 
    description: '',
    episode: {
        id: '',
        title: '',
        description: '',
        audio: '',
        audioType: '',
    }
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        setPodcastDetailState: (state, action) => {
            // Save the podcast data to the state
            const {id, image, title, author, description} = action.payload
            
            state.id = id
            state.image = image
            state.title = title
            state.author = author
            state.description = description

            return state
        },
        addEpisodeAudio: (state, action) => {
            // Add the episode audio to the state
            const {id, title, description, audio, audioType } = action.payload

            return {
                ...state,
                episode: {
                    id: id,
                    title: title,
                    description: description,
                    audio: audio,
                    audioType: audioType
                }
            }
        }
    }
})

export default podcastSlice.reducer
export const {setPodcastDetailState, addEpisodeAudio} = podcastSlice.actions
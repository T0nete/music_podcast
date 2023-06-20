import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store/index'
import EpisodeDetail from './EpisodeDetail'
import { configureStore } from '@reduxjs/toolkit'
import podcastReducer, { addEpisodeAudio, setPodcastDetailState } from '../store/podcastSlice'

const mockPodcastDetail = {
    id: '1',
    image: 'https://picsum.photos/200',
    title: 'testTitle',
    author: 'testAuthor',
    description: 'podcastDescription'
}

const mockEpisode = {
  id: '1',
  title: 'test',
  description: '01:00:00',
  audio: 'testAudio',
  audioType: 'audio/mpeg'
}

// const globalEpisode = {
//     id: episode.id,
//     title: episode.title,
//     description: episode.description,
//     audio: episode.audio,
//     audioType: episode.audioType,
// }

describe('EpisodeDetail', () => {
    test('renders EpisodeDetail component', () => {
        render(
            <Provider store={store}>
                <EpisodeDetail />
            </Provider>
        )

        const titleElement = screen.getByRole('episodeDetail')
        expect(titleElement).toBeInTheDocument()
    })

    test('renders episode title', () => {
        // Save the episode to the store
        const testStore = configureStore({
            reducer: { 
                podcast: podcastReducer 
            },
        })
        testStore.dispatch(setPodcastDetailState(mockPodcastDetail))
        testStore.dispatch(addEpisodeAudio(mockEpisode))

        render(
            <Provider store={testStore}>
                <EpisodeDetail />
            </Provider>
        )

        const titleElement = screen.getByText(mockEpisode.title)
        expect(titleElement).toBeInTheDocument()
    })

    test('renders episode description', () => {
        // Save the episode to the store
        const testStore = configureStore({
            reducer: { 
                podcast: podcastReducer 
            },
        })
        testStore.dispatch(setPodcastDetailState(mockPodcastDetail))
        testStore.dispatch(addEpisodeAudio(mockEpisode))

        render(
            <Provider store={testStore}>
                <EpisodeDetail />
            </Provider>
        )

        const descriptionElement = screen.getByText(mockEpisode.description)
        expect(descriptionElement).toBeInTheDocument()
        expect(descriptionElement).toHaveTextContent(mockEpisode.description)
    })

    test('renders episode audio', () => {
        // Save the episode to the store
        const testStore = configureStore({
            reducer: { 
                podcast: podcastReducer 
            },
        })
        testStore.dispatch(setPodcastDetailState(mockPodcastDetail))
        testStore.dispatch(addEpisodeAudio(mockEpisode))

        render(
            <Provider store={testStore}>
                <EpisodeDetail />
            </Provider>
        )

        const audioElement = screen.getByRole('audio')
        expect(audioElement).toBeInTheDocument()
        console.log(audioElement)
    })
})
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store/index'
import EpisodeList from './EpisodeList'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import podcastReducer, { addEpisodeAudio, setPodcastDetailState } from '../store/podcastSlice'
import { formatDateMMDDYYYY } from '../utils/utils'


const podcastMock = {
    id: '1',
    image: 'https://picsum.photos/200',
    title: 'testTitle',
    author: 'testAuthor',
    feedUrl: 'testFeedUrl',
}

const episodesMock = [
    {
        id: '1',
        title: 'testTitleEpisode',
        pubDate: '20/06/2023',
        duration: 'testDuration',
        audio: 'testAudio',
        audioType: 'audio/mpeg',
        description: 'testDescription'
    }
]

const detailMock = {
    description: 'testDescription',
    episodes: episodesMock
}

const mockPodcastDetail = {
    ...podcastMock,
    description: detailMock.description,
    episodes: detailMock.episodes
}

describe('EpisodeList', () => {
    test('renders EpisodeList component', () => {
        render(
            <Provider store={store}>
                <EpisodeList />
            </Provider>
        )

        const titleElement = screen.getByRole('episodeList')
        expect(titleElement).toBeInTheDocument()
    })

    test('renders episode list', () => {
        render(
            <Provider store={store}>
                {/* As we add data, the data will make a link to the episode page, so we need the router*/}
                <Router>
                    <EpisodeList podcastDetail={mockPodcastDetail}/>
                </Router>
            </Provider>
        )

        const episodeList = screen.getByRole('episodeList').querySelector('li')
        expect(episodeList).toBeInTheDocument()
    })

    
    test('renders episode list items with correct data', () => {
        render(
            <Provider store={store}>
                {/* As we add data, the data will make a link to the episode page, so we need the router*/}
                <Router>
                    <EpisodeList podcastDetail={mockPodcastDetail}/>
                </Router>
            </Provider>
        )

        const titleEpisode = screen.getByText(episodesMock[0].title)
        const dateEpisode = screen.getByText(formatDateMMDDYYYY(episodesMock[0].pubDate))
        const durationEpisode = screen.getByText(episodesMock[0].duration)

        expect(titleEpisode).toBeInTheDocument()
        expect(dateEpisode).toBeInTheDocument()
        expect(durationEpisode).toBeInTheDocument()
    })

})
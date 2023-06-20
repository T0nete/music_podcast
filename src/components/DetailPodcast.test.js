import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { store } from '../store/index'
import { Provider } from 'react-redux'
import DetailPodcast from './DetailPodcast'


describe('DetailPodcast', () => {
    test('renders DetailPage component', () => {
        render(
            <Provider store={store}>
                <DetailPodcast />
            </Provider>
        )

        const detailPodcast = screen.getByRole('detailPodcast')
        expect(detailPodcast).toBeInTheDocument()
    })

    test('renders number of episodes', () => {
        const numberOfEpisodes = 10
        
        render(
            <Provider store={store}>
                <DetailPodcast numberOfEpisodes={numberOfEpisodes} />
            </Provider>
        )

        const numberOfEpisodesElement = screen.getByRole('detailPodcast').querySelector('span')
        expect(numberOfEpisodesElement).toBeInTheDocument()
        expect(numberOfEpisodesElement.textContent).toBe(numberOfEpisodes.toString())
      })


    test('renders episode list', () => {
        render(
          <Provider store={store}>
            <DetailPodcast />
          </Provider>
        )
    
        const episodeList = screen.getByRole('episodeList')
        expect(episodeList).toBeInTheDocument()
    })

})
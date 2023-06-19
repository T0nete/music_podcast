import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PodcastCard from './PodcastCard'

const mockPodcast = {
    name: 'Test Podcast',
    artist: 'Toni'
}

describe('PodcastCard', () => {
    test('renders PodcastCard component', () => {
        render(<PodcastCard podcast={mockPodcast} />)

        const podcastCard = screen.getByRole('podcastCard')
        expect(podcastCard).toBeInTheDocument()
    })

    test('display correct name', () => {
        render(<PodcastCard podcast={mockPodcast} />)
        
        const podcastName = screen.getByText(mockPodcast.name.toUpperCase())
        expect(podcastName).toBeInTheDocument()
    })

    test('name is not in lowe case', () => {
        render(<PodcastCard podcast={mockPodcast} />)
        
        const podcastName = screen.queryByText(mockPodcast.name.toLowerCase())
        expect(podcastName).toBeNull()
    })

    test('display correct name', () => {
        render(<PodcastCard podcast={mockPodcast} />)
        
        const podcastName = screen.getByText(`Author: ${mockPodcast.artist}`)
        expect(podcastName).toBeInTheDocument()
    })
})

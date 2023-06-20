import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import PodcastDescription from './PodcastDescription'


const mockPodcast = {
    id: '123',
    title: 'Title Test',
    image: 'https://picsum.photos/200',
    description: 'Description Test',
    author: 'Author Test',
}


describe('PodcastDescription', () => {
    test('renders PodcastDescription component', () => {
        render(
            <Router>
            <PodcastDescription {...mockPodcast} />
            </ Router>
        )

        const podcastDescription = screen.getByRole('podcastDescription')
        expect(podcastDescription).toBeInTheDocument()
    })

    test('display correct title', () => {
    render(
        <Router>
            <PodcastDescription {...mockPodcast} />
        </ Router>
    )

        const podcastTitle = screen.getByText(mockPodcast.title)
        expect(podcastTitle).toBeInTheDocument()
    })

    test('display correct author', () => {
        render(
            <Router>
                <PodcastDescription {...mockPodcast} />
            </ Router>
        )

        const podcastAuthor = screen.getByText(`by ${mockPodcast.author}`)
        expect(podcastAuthor).toBeInTheDocument()
    })

    test('display correct description', () => {
        render(
            <Router>
                <PodcastDescription {...mockPodcast} />
            </ Router>
        )

        const podcastDescription = screen.getByText(mockPodcast.description)
        expect(podcastDescription).toBeInTheDocument()
    })

    test('display correct image', () => {
        render(
            <Router>
                <PodcastDescription {...mockPodcast} />
            </ Router>
        )

        const podcastImage = screen.getByRole('img')
        expect(podcastImage).toBeInTheDocument()
        expect(podcastImage).toHaveAttribute('src', mockPodcast.image)
    })

})
import { useEffect, useState } from 'react'
import { getPodcasts } from '../services/useITunes'

export const usePodcast = () => {
    const [initialState, setInitialState] = useState([])
    const [filteredPodcasts, setFilteredPodcasts] = useState([])
    const [filter, setFilter] = useState('')
    const [loadingPodcast, setLoadingPodcast] = useState(false)
    const [errorPodcast, setErrorPodcast] = useState('')

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                setLoadingPodcast(true)
                const podcasts = await getPodcasts()
                setInitialState(podcasts)
                setFilteredPodcasts(podcasts)
            } catch (error) {
                setErrorPodcast(error.message)
            } finally {
                setLoadingPodcast(false)
            }
        }

        fetchPodcast()
    }, [])

    useEffect(() => {
        if (filter) {
            const filteredPodcasts = initialState.filter(podcast => {
                return podcast.name.toLowerCase().includes(filter.toLowerCase()) || podcast.artist.toLowerCase().includes(filter.toLowerCase())
            })
            setFilteredPodcasts(filteredPodcasts)
        } else {
            setFilteredPodcasts(initialState)
        }
    }, [filter])

    return {filteredPodcasts, errorPodcast, loadingPodcast, setFilter}
}
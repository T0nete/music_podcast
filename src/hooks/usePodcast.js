import { useEffect, useState } from 'react'
import { getPodcasts } from '../services/useITunes'
import {setLoadingState} from '../store/loadingSlice'
import { useDispatch } from 'react-redux'

export const usePodcast = () => {
    const dispatch = useDispatch()

    const [initialState, setInitialState] = useState([])
    const [filteredPodcasts, setFilteredPodcasts] = useState([])
    const [filter, setFilter] = useState('')
    const [errorPodcast, setErrorPodcast] = useState('')

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                // Clear the error
                setErrorPodcast('')

                // Update loading state
                dispatch(setLoadingState(true))

                // Get podcasts from iTunes API
                const podcasts = await getPodcasts()

                // We need the initial state to clear the filter
                setInitialState(podcasts)

                setFilteredPodcasts(podcasts)
            } catch (error) {
                console.log(error)
                setErrorPodcast(error.message)
            } finally {
                dispatch(setLoadingState(false))

            }
        }

        fetchPodcast()
    }, [])


    useEffect(() => {
        // Filter podcasts by name or artist
        if (filter) {
            const filteredPodcasts = initialState.filter(podcast => {
                return podcast.name.toLowerCase().includes(filter.toLowerCase()) || podcast.artist.toLowerCase().includes(filter.toLowerCase())
            })
            setFilteredPodcasts(filteredPodcasts)
        } else {
            setFilteredPodcasts(initialState)
        }
    }, [filter])

    return {filteredPodcasts, errorPodcast, setFilter}
}
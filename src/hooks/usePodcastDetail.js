import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPodcastById } from "../services/useITunes"
import { setPodcastDetailState } from "../store/podcastSlice"
import {setLoadingState} from '../store/loadingSlice'

export const usePodcastDetail = (podcastId) => {
    const dispatch = useDispatch()

    const [podcastDetail, setPodcastDetail] = useState({})
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0)
    const [errorPodcastDetail, setErrorPodcastDetail] = useState('')

    useEffect(() => {
        // Fetch podcast detail
        const fetchPodcastDetail = async () => {
            try {
                // Clear the error
                setErrorPodcastDetail('')

                // Update loading state
                dispatch(setLoadingState(true))

                const podcast = await getPodcastById(podcastId)
                setPodcastDetail(podcast)

                if (podcast.episodes !== undefined) {
                    setNumberOfEpisodes(podcast.episodes.length)
                } else {
                    setNumberOfEpisodes(0)
                }

                // Save podcast detail to global state
                const globalPodcast = {
                  id: podcast.id,
                  image: podcast.image,
                  title: podcast.title,
                  author: podcast.author,
                  description: podcast.description,
                }
                console.log(globalPodcast)
                dispatch(setPodcastDetailState(globalPodcast))
            } catch (error) {
                console.log(error.message)
                setErrorPodcastDetail(error.message)
            } finally {
                // Update loading state
                dispatch(setLoadingState(false))
            }
        }
        
        fetchPodcastDetail()
    }, [])

    return { podcastDetail, numberOfEpisodes, errorPodcastDetail}
}
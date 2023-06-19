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
        const fetchPodcastDetail = async () => {
            try {
                dispatch(setLoadingState(true))
                const podcast = await getPodcastById(podcastId)
                setPodcastDetail(podcast)
                setNumberOfEpisodes(podcast.episodes.length)
                const globalPodcast = {
                  id: podcast.id,
                  image: podcast.image,
                  title: podcast.title,
                  author: podcast.author,
                  description: podcast.description,
                }
                dispatch(setPodcastDetailState(globalPodcast))
                setErrorPodcastDetail('')
            } catch (error) {
                setErrorPodcastDetail(error.message)
            } finally {
                dispatch(setLoadingState(false))
            }
        }
        
        fetchPodcastDetail()
    }, [])

    return { podcastDetail, numberOfEpisodes, errorPodcastDetail}
}
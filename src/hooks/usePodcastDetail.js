import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPodcastById } from "../services/useITunes"
import { setPodcastDetailState } from "../store/podcastSlice"

export const usePodcastDetail = (podcastId) => {
    const dispatch = useDispatch()
    const [podcastDetail, setPodcastDetail] = useState({})
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0)
    const [loadingPodcastDetail, setLoadingPodcastDetail] = useState(false)
    const [errorPodcastDetail, setErrorPodcastDetail] = useState('')

    useEffect(() => {
        const fetchPodcastDetail = async () => {
            try {
                setLoadingPodcastDetail(true)
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
                setLoadingPodcastDetail(false)
            }
        }
        
        fetchPodcastDetail()
    }, [])

    return { podcastDetail, numberOfEpisodes, loadingPodcastDetail, errorPodcastDetail}
}
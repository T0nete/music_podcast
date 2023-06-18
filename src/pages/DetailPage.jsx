import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPodcastDetailState } from '../store/podcastSlice'
import PodcastDescription from '../components/PodcastDescription'
import EpisodeList from '../components/EpisodeList'
import { getPodcastById } from '../services/useITunes'

function DetailPage () {
    const { podcastId } = useParams()
    const [podcastDetail, setPodcastDetail] = useState({})
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0)
    const dispatch = useDispatch()

    // TODO: Extract to a custom hook
    useEffect(() => {
        getPodcastById(podcastId)
            .then(podcast => {
                setPodcastDetail(podcast)
                setNumberOfEpisodes(podcast.episodes.length)

                const globalPodcast = {
                    id: podcast.id,
                    image: podcast.image,
                    title: podcast.title,
                    author: podcast.author,
                    description: podcast.description
                }
                dispatch(setPodcastDetailState(globalPodcast))
            })
    }, [])

    return (
        <div className='w-4/5 m-auto flex flex-row gap-20'>
            <aside className='w-1/4'>
                {
                    <PodcastDescription 
                        id={podcastDetail.id}
                        image={podcastDetail.image}  
                        author={podcastDetail.author}
                        title={podcastDetail.title}
                        description={podcastDetail.description}
                    />
                }
            </aside>

            <main className='w-3/4 flex flex-col'>
                <div className='p-2 flex flex-col shadow-md rounded-md divide-y-2'> 
                    <h2 className='text-lg font-semibold'>Episodes: <span className='font-bold text-lg'>{numberOfEpisodes}</span> </h2>
                </div>
                <EpisodeList podcastDetail={ podcastDetail }/>
            </main>
        </div>
    )
}
export default DetailPage
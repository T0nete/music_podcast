import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPodcastDetailState } from '../store/podcastSlice'
import PodcastDescription from '../components/PodcastDescription'
import EpisodeList from '../components/EpisodeList'
import { getPodcastById } from '../services/useITunes'

function DetailPage ({ isLoading, handlePageLoading }) {
    const { podcastId } = useParams()
    const [podcastDetail, setPodcastDetail] = useState({})
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(0)
    const dispatch = useDispatch()

    // TODO: Extract to a custom hook
    useEffect(() => {
        console.log('detailpage')
        handlePageLoading(true)
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

                console.log(globalPodcast)
                dispatch(setPodcastDetailState(globalPodcast))
            }).finally(() => {
                handlePageLoading(false)
            })
    }, [])

    return (
        <div className='w-4/5 m-auto p-4'>
            {
                !isLoading && (
                    <div className='flex flex-row gap-20'>
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
                        <main className='w-3/4 py-2flex flex-col'>
                            <div className='p-2 flex flex-col shadow-md rounded-md divide-y-2'> 
                                <h2 className='text-lg font-semibold'>Episodes: <span className='font-bold text-lg'>{numberOfEpisodes}</span> </h2>
                            </div>
                            <div className='py-4'>
                                <EpisodeList podcastDetail={ podcastDetail }/>
                            </div>
                        </main>
                    </div>
                )
            }
        </div>
    )
}
export default DetailPage
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import PodcastDescription from '../components/PodcastDescription'
import { usePodcastDetail } from '../hooks/usePodcastDetail'
import { useSelector } from 'react-redux'
import DetailPage from './DetailPage'
import EpisodeDetailPage from './EpisodeDetailPage'

function PodcastPage () {
    const location = useLocation()
    const { podcastId } = useParams()
    const { podcastDetail, numberOfEpisodes, errorPodcastDetail } = usePodcastDetail(podcastId)
    const isLoading = useSelector(state => state.loading)

    return (
        <div className='w-4/5 m-auto p-4'>
            {
                errorPodcastDetail 
                ? <h1>{errorPodcastDetail}</h1>
                : !isLoading &&
                    <div className='flex flex-row gap-20'>
                        <aside className='w-1/4'>
                            <PodcastDescription  {...podcastDetail} />
                        </aside>
                        <main className='w-3/4 py-2flex flex-col'>
                            {console.log(location.pathname)}
                            {
                                location.pathname === `/podcast/${podcastId}`
                                ? <DetailPage numberOfEpisodes={numberOfEpisodes} podcastDetail={podcastDetail}/>
                                : <EpisodeDetailPage />
                            }
                        </main>
                    </div>
            }
        </div>
    )
}

export default PodcastPage
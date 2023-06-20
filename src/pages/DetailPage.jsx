import React from 'react'
import { useParams } from 'react-router-dom'
import PodcastDescription from '../components/PodcastDescription'
import EpisodeList from '../components/EpisodeList'
import { usePodcastDetail } from '../hooks/usePodcastDetail'
import { useSelector } from 'react-redux'

function DetailPage () {
    const { podcastId } = useParams()
    const {podcastDetail, numberOfEpisodes, errorPodcastDetail} = usePodcastDetail(podcastId)
    const isLoading = useSelector(state => state.loading)

    return (
        <div className='w-4/5 m-auto p-4'>
            {
                errorPodcastDetail 
                ? <h1>{errorPodcastDetail}</h1>
                : !isLoading &&
                    <div className='flex flex-row gap-20'>
                        <aside className='w-1/4'>
                            {
                                <PodcastDescription {...podcastDetail} />
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
                
            }
        </div>
    )
}
export default DetailPage
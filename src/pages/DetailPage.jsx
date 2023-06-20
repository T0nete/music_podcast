import React from 'react'
import { useParams } from 'react-router-dom'
import PodcastDescription from '../components/PodcastDescription'
import EpisodeList from '../components/EpisodeList'

function DetailPage ({numberOfEpisodes, podcastDetail}) {
    return (
        <div>
            <div className='p-2 flex flex-col shadow-md rounded-md divide-y-2'> 
                <h2 className='text-lg font-semibold'>Episodes: 
                    <span className='font-bold text-lg'>{numberOfEpisodes}</span> 
                </h2>
            </div>
            <div className='py-4'>
                <EpisodeList podcastDetail={ podcastDetail }/>
            </div>
        </div>
    )
}
export default DetailPage
import React from 'react'
import EpisodeList from './EpisodeList'

function DetailPage ({numberOfEpisodes, podcastDetail}) {
    return (
        <div className='detailPage'>
            <div className='p-2 flex flex-col shadow-md rounded-md divide-y-2'> 
                <h2 className='text-lg font-semibold'>Episodes: <span className='font-bold text-lg'>{numberOfEpisodes}</span></h2>
            </div>
            <div className='py-4 flex flex-col shadow-md rounded-md divide-y-2'>
                <EpisodeList podcastDetail={ podcastDetail }/>
            </div>
        </div>
    )
}
export default DetailPage
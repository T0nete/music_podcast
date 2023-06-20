import React from 'react'
import {useSelector} from 'react-redux'

function EpisodeDetail () {
    const { episode } = useSelector(state => state.podcast)

    return (
        <div role="episodeDetail" className='p-2 flex flex-col shadow-md rounded-md'>
            <h1>{episode.title}</h1>
            {/* Some descriptions have html tags, so we use dangerouslySetInnerHTML to render them */}
            <div dangerouslySetInnerHTML={{ __html: episode.description }} />
            <audio role="audio" controls className='w-full p-2'>
                <source src={episode.audio} type={episode.audioType} />
            </audio>
        </div>
    )
}

export default EpisodeDetail
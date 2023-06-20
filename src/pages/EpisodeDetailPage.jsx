import React from 'react'
import {useSelector} from 'react-redux'

function EpisodeDetailPage () {
    const {episode} = useSelector(state => state.podcast)

    return (
        <div className='flex flex-row w-4/5 m-auto p-4 gap-20'>
            <div className='p-2 flex flex-col shadow-md rounded-md'>
                <h1>{episode.title}</h1>
                {/* Some descriptions have html tags, so we use dangerouslySetInnerHTML to render them */}
                <div dangerouslySetInnerHTML={{ __html: episode.description }} />
                <audio controls className='w-full p-2'>
                    <source src={episode.audio} type={episode.audioType} />
                </audio>
            </div>
        </div>
    )
}

export default EpisodeDetailPage
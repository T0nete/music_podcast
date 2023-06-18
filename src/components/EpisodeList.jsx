import React from 'react'
import { formatDateMMDDYYYY } from '../utils/utils'
import { Link } from 'react-router-dom'

const EpisodeList = ({ podcastDetail }) => {
    return (
        <div className='p-4 flex flex-col shadow-md rounded-md divide-y-2'>
            <div className='flex flex-row justify-between p-2'>
                <h3 className='w-8/12 font-bold'>Title</h3>
                <h3 className='w-2/12 font-bold'>Date</h3>
                <h3 className='w-2/12 font-bold'>Duration</h3>
            </div>
            {
                podcastDetail.episodes?.map((episode, index) => {
                    return (
                        <div 
                            key={`${episode.id}_${index}`} 
                            className={`flex flex-row justify-between p-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} `}
                        >
                            <div className='flex flex-col w-8/12'>
                                <Link to={`/podcast/${podcastDetail.id}/episode/${episode.id}`}>
                                    <h3 className='text-start'>{episode.title}</h3>
                                </Link>
                            </div>
                            <div className="flex w-2/12">
                                <p className='text-right'>{formatDateMMDDYYYY(episode.pubDate)}</p>
                            </div>
                            <div className='flex w-2/12'>
                                <p className='text-right'>{episode.duration}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default EpisodeList
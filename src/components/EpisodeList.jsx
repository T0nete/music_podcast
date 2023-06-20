import React from 'react'
import { formatDateMMDDYYYY } from '../utils/utils'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addEpisodeAudio } from '../store/podcastSlice'
import { setLoadingState } from '../store/loadingSlice'

const EpisodeList = ({ podcastDetail }) => {
    const dispatch = useDispatch()

    const handleOnClickEpisode = (episode) => {
        // We add the episode audio to the global state to navigate to the episode detail page
        dispatch(setLoadingState(true))

        const globalEpisode = {
            id: episode.id,
            title: episode.title,
            description: episode.description,
            audio: episode.audio,
            audioType: episode.audioType,
        }

        dispatch(addEpisodeAudio(globalEpisode))
        dispatch(setLoadingState(false))
    }
    
    return (
        <div role="episodeList" className='p-4 divide-y-2'>
            <div className='flex flex-row justify-between p-2'>
                <h3 className='w-8/12 font-bold'>Title</h3>
                <h3 className='w-2/12 font-bold'>Date</h3>
                <h3 className='w-2/12 font-bold'>Duration</h3>
            </div>
            <ul>
                {
                    podcastDetail?.episodes?.map((episode, index) => {
                        return (
                            <li
                                key={`${episode.id}_${index}`} 
                                className={`flex flex-row list-none justify-between p-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} `}
                            >
                                <div className='flex w-8/12'>
                                    <Link 
                                        to={`/podcast/${podcastDetail.id}/episode/${episode.id}`}
                                        onClick={() =>handleOnClickEpisode(episode)}
                                    >
                                        <h3 className='text-start'>{episode.title}</h3>
                                    </Link>
                                </div>
                                <div className="flex w-2/12">
                                    <p className='text-right'>{formatDateMMDDYYYY(episode.pubDate)}</p>
                                </div>
                                <div className='flex w-2/12'>
                                    <p className='text-right'>{episode.duration}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default EpisodeList
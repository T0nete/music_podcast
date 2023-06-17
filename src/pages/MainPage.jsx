import React, { useEffect } from 'react'
import getPodcasts  from '../services/useITunes'
import PodcastCard from '../components/PodcastCard'

function MainPage () {
    const [podcasts, setPodcasts] = React.useState([])
    
    useEffect(() => {
        getPodcasts()
            .then(podcasts => setPodcasts(podcasts))
    }, [])

    return (
        <div className='w-full flex flex-col'>
            <div className='grid grid-cols-4'>
                {
                    podcasts.map(podcast => {
                        return (
                            <div 
                                key={podcast.id}
                                className='h-full p-4 items-center justify-center flex flex-col'    
                            >
                                <img 
                                    src={podcast.img} 
                                    alt='podcast cover'
                                    className='h-32 w-32 rounded-full'
                                />
                                <div  className=''>
                                    <PodcastCard podcast={podcast} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainPage
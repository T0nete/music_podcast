import React, { useCallback } from 'react'
import PodcastCard from '../components/PodcastCard'
import FilterPodcast from '../components/FilterPodcast'
import { Link } from 'react-router-dom'
import { usePodcast } from '../hooks/usePodcast'
import { useSelector } from 'react-redux'

function MainPage () {
    const {filteredPodcasts, errorPodcast, setFilter} = usePodcast()
    const isLoading = useSelector(state => state.loading)
    
    const handleChangeFilter = useCallback((value) => {
        setFilter(value)
      }, [setFilter])

    return (
        <main className='w-4/5 m-auto  p-4'>
            {
                errorPodcast 
                ? <h1>{podcastError}</h1>
                : !isLoading && 
                <div className='flex flex-col'>
                    <FilterPodcast handleChangeFilter={handleChangeFilter} />
                    <div className='grid grid-cols-4'>
                        {
                            filteredPodcasts && filteredPodcasts.map(podcast => {
                                return (
                                    <div 
                                        key={podcast.id}
                                        className='h-full w-full p-4 items-center justify-center flex flex-col'    
                                    >
                                        <img 
                                            src={podcast.img} 
                                            alt='podcast cover'
                                            className='h-32 w-32 rounded-full'
                                        />
                                        <div  className='w-full'>
                                            <Link to={`/podcast/${podcast.id}`}>
                                                <PodcastCard podcast={podcast} />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </main>
    )
}

export default MainPage
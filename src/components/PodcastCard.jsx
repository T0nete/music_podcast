import React from "react"

const PodcastCard = ({ podcast }) => {
    return (
        <div role="podcastCard" className='p-4 shadow-md rounded-md' >
            <h3 className="font-semibold text-base">{podcast?.name?.toUpperCase()}</h3>
            <p className="text-gray-500">Author: {podcast?.artist}</p>
        </div>
    )
}

export default PodcastCard
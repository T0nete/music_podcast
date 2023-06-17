import React from 'react'

const FilterPodcast = ({handleChangeFilter}) => {
    return (
        <div className="justify-end flex flex-row items-center gap-2">
            <div className="bg-blue-500 p-1 rounded-lg">
                <p className="font-bold text-white ">100</p>
            </div>
            <input
                type="text"
                className="h-10 border-2 border-gray-300 rounded-lg px-4 focus:border-blue-500 outline-none"
                placeholder="Filter podcasts..."
                onChange={(e) => handleChangeFilter(e.target.value)}
            >
            </input>
        </div>
    )
}

export default FilterPodcast
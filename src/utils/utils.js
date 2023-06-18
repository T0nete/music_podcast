const oneDay = 24 * 60 * 60 * 1000

// Check if the last time the podcasts were fetched was more than 24 hours ago
export const refreshPodcasts = () => {
    const systemDate = new Date().getTime()
    const podcastStoredDate = localStorage.getItem('podcastsDate')
    
    return (systemDate - podcastStoredDate) > oneDay
}

// Check if the details of a podcast were fetched more than 24 hours ago
export const refreshPodcastDetails = (id) => {
    const systemDate = new Date().getTime()
    const podcastStoredDate = localStorage.getItem(`podcastsDate_${id}`)
    
    return (systemDate - podcastStoredDate) > oneDay
}

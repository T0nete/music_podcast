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

export const formatDateMMDDYYYY = (date) => {
    const newDate = new Date(date)
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const year = newDate.getFullYear()
    
    return `${month}/${day}/${year}`
}
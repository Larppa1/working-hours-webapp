export const getDuration = async (id) => {
    const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`)
    const data = await res.json()
    return data.duration
}
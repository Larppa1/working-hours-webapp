export const getTasks = async () => {
    //Get upcoming tasks data
    const res = await fetch('http://127.0.0.1:3010/upcomingTasks')
    const data = await res.json()
    
    return data
}
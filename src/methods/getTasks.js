export const getTasks = async () => {
    //Create temp array for fetched data
    let tempList = []

    //Get upcoming tasks data
    const response = await fetch('http://127.0.0.1:3010/upcomingTasks')
    const result = await response.json()

    //Set fetched data to temp array
    for(let i = 0; i < result.length; i++) {
        tempList[i] = result[i]
    }

    return tempList
}
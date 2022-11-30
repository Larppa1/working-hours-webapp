export const addTimeBetween = async (location, upcomingTaskList) => {
    if(location.pathname !== '/tasks') {
        for(let i = 0; i < upcomingTaskList.length; i++) {
            if(localStorage.getItem(`task${upcomingTaskList[i].id}windowCloseTime`) !== null) {
                const timeBetween = Math.round((new Date().getTime() - new Date(localStorage.getItem(`task${upcomingTaskList[i].id}windowCloseTime`)).getTime()) / 1000) * 1000

                const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${i + 1}`)
                const data = await res.json()

                await fetch(`http://127.0.0.1:3010/upcomingTasks/${i + 1}`, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            duration: data.duration + timeBetween,
                        }),
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                    })
            }
            
        }
    }
}
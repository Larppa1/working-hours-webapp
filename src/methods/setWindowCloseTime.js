export const setWindowCloseTime = (location, upcomingTaskList) => {
    if(location.pathname !== '/tasks') return

    for(let i = 0; i < upcomingTaskList.length; i++) {
        localStorage.getItem(`task${upcomingTaskList[i].id}active`)
            ? localStorage.setItem(`task${upcomingTaskList[i].id}windowCloseTime`, new Date())
            : localStorage.removeItem(`task${upcomingTaskList[i].id}windowCloseTime`)
        }
}
export const setWindowCloseTime = (location, upcomingTaskList) => {
    if(location.pathname === '/tasks') {
        for(let i = 0; i < upcomingTaskList.length; i++) {
            if(localStorage.getItem(`task${upcomingTaskList[i].id}active`)) {
                localStorage.setItem(`task${upcomingTaskList[i].id}windowCloseTime`, new Date())
            }else {
                localStorage.removeItem(`task${upcomingTaskList[i].id}windowCloseTime`)
            }
        }
    }
}
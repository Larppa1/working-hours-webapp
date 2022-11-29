export const taskDetailsListener = id => {
    //Listen to task name changes and patch new name to json-server
    document.getElementById(`taskName${id}`).addEventListener('input', () => {
        setTimeout(() => {
            fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: document.getElementById(`taskName${id}`).innerHTML,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
        }, 2000)
    })

    //Listen to task description changes and patch new task description to json-server
    document.getElementById(`taskDescription${id}`).addEventListener('input', () => {
        setTimeout(() => {
            fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                description: document.getElementById(`taskDescription${id}`).innerHTML,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        }, 2000)
    })

    //Listen to task finish date changes and patch new finish date to json-server
    document.getElementById(`taskFinishDate${id}`).addEventListener('input', () => {
        setTimeout(() => {
            fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                finishDate: document.getElementById(`taskFinishDate${id}`).innerHTML,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        }, 2000)
    })

    //Listen to task finish time changes and patch new finish time to json-server
    document.getElementById(`taskFinishTime${id}`).addEventListener('input', () => {
        setTimeout(() => {
            fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                finishTime: document.getElementById(`taskFinishTime${id}`).innerHTML,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        }, 2000)
    })
}
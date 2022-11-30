export const updateDuration = async (id, duration) => {
    await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            duration: duration,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
}
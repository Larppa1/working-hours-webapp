export const changeCategory = async (index, tempVar, id) => {
    document.getElementById(`taskCategory${tempVar}`).innerHTML = document.getElementById(`categoryListItem${index}`).innerText
    document.getElementById('categoryList').style.display = 'none'

    const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}/`)
    const data = await res.json()

    let tempList = data.categoryList
    tempList.splice(tempVar, 1, document.getElementById(`categoryListItem${index}`).innerText)
    tempList.push('+')

    await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            categoryList: tempList,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
}
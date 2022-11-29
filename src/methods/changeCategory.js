export const changeCategory = async (index, tempVar, id) => {
    document.getElementById(`taskCategory${tempVar}`).innerHTML = document.getElementById(`categoryListItem${index}`).innerText
    document.getElementById('categoryList').style.display = 'none'

    const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}/`)
    const data = await res.json()

    let tempList = []
    for(let i = 0; i < data.categoryList.length; i++) {
        i !== tempVar
            ? tempList[i] = data.categoryList[i]
            : tempList[i] = document.getElementById(`categoryListItem${index}`).innerText
    }

    fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            categoryList: tempList,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })

    return null
}
export const addTaskCategory = async (id, tempVar) => {
    //Fetch task category list
    const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}/`)
    const data = await res.json()

    //Second temp list -> task category list plus new category
    let tempList = data.categoryList
    tempList.splice(tempVar, 1, document.getElementById('newCategory').value)

    //Patch second temp list containing new category to task category list in json-server
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
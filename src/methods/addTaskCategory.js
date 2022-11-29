export const addTaskCategory = async (id, tempVar) => {
    //Fetch task category list
    const res2 = await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}/`)
    const data2 = await res2.json()

    //Second temp list -> task category list plus new category
    let tempList2 = []
    for(let i = 0; i < data2.categoryList.length; i++) {
        i !== tempVar
            ? tempList2[i] = data2.categoryList[i]
            : tempList2[i] = document.getElementById('newCategory').value
    }

    //Patch second temp list containing new category to task category list in json-server
    await fetch(`http://127.0.0.1:3010/upcomingTasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            categoryList: tempList2,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
}
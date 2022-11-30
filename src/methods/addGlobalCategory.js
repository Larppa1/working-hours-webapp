export const addGlobalCategory = async (tempVar) => {
    //Set clicked task category value to new category value
    document.getElementById(`taskCategory${tempVar}`).innerText = document.getElementById('newCategory').value

    //Fetch global category list
    const res = await fetch(`http://127.0.0.1:3010/categories/0`)
    const data = await res.json()

    //Temp list -> global category list plus new category
    let tempList = data.categoryList
    tempList.push(document.getElementById('newCategory').value)

    //Patch temp category list containing new category to global category list in json-server
    await fetch(`http://127.0.0.1:3010/categories/0`, {
        method: 'PATCH',
        body: JSON.stringify({
            categoryList: tempList,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
}
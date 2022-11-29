export const addGlobalCategory = async (tempVar) => {
    //Set clicked task category value to new category value
    document.getElementById(`taskCategory${tempVar}`).innerText = document.getElementById('newCategory').value

    //Fetch global category list
    const res = await fetch(`http://127.0.0.1:3010/categories/0`)
    const data = await res.json()

    //Temp list -> global category list plus new category
    let tempList = []
    for(let i = 0; i < data.categoryList.length; i++) {
        tempList[i] = data.categoryList[i]
    }
    tempList[data.categoryList.length] = document.getElementById('newCategory').value

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
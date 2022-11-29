//Get all saved categories from json-server
export const getCategories = async () => {
    let tempList = []

    const res = await fetch('http://127.0.0.1:3010/categories/0')
    const data = await res.json()
    
    for(let i = 0; i < data.categoryList.length; i++) {
        tempList[i] = data.categoryList[i]
    }

    return tempList
}
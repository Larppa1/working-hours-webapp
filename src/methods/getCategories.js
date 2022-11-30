//Get all saved categories from json-server
export const getCategories = async () => {
    const res = await fetch('http://127.0.0.1:3010/categories/0')
    const data = await res.json()

    return data.categoryList
}
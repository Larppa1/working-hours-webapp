// Category list controller
export const openCategoryList = (index, e) => {
    //IF categoryList display type is none, set display type to flex.
    //ELSE set display type to none.
    document.getElementById('categoryList').style.display !== 'flex'
        ? document.getElementById('categoryList').style.display = 'flex'
        : document.getElementById('categoryList').style.display = 'none'

    //Clicked category name y position minus offset.
    const posY = e.target.getBoundingClientRect().y * 0.79

    //Set categoryList top value to posY.
    document.getElementById('categoryList').style.top = `${posY}px`

    return index
}
import { useEffect, useState } from 'react'
import './Task.css'

export default function Task(props) {
    //Check if task is currently active
    const [isTaskActive, setIsTaskActive] = useState(Boolean(localStorage.getItem(`task${props.id}active`)))

    //Current task duration
    const [duration, setDuration] = useState(Number(props.duration))

    //List of saved categories
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        localStorage.getItem(`task${props.id}windowCloseTime`) !== null
            ? setIsTaskActive(true)
            : setIsTaskActive(false)
        getCategories()
        getDuration()

        //Listen to task name changes and patch new name to json-server
        document.getElementById(`taskName${props.id}`).addEventListener('input', () => {
            setTimeout(() => {
                fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: document.getElementById(`taskName${props.id}`).innerHTML,
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                })
            }, 2000)
        })
        
        //Listen to task description changes and patch new task description to json-server
        document.getElementById(`taskDescription${props.id}`).addEventListener('input', () => {
            setTimeout(() => {
                fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    description: document.getElementById(`taskDescription${props.id}`).innerHTML,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
            }, 2000)
        })

        //Listen to task finish date changes and patch new finish date to json-server
        document.getElementById(`taskFinishDate${props.id}`).addEventListener('input', () => {
            setTimeout(() => {
                fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    finishDate: document.getElementById(`taskFinishDate${props.id}`).innerHTML,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
            }, 2000)
        })

        //Listen to task finish time changes and patch new finish time to json-server
        document.getElementById(`taskFinishTime${props.id}`).addEventListener('input', () => {
            setTimeout(() => {
                fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    finishTime: document.getElementById(`taskFinishTime${props.id}`).innerHTML,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
            }, 2000)
        })
    }, [])

    //Get current duration from json-server on open
    const getDuration = async () => {
        const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`)
        const data = await res.json()
        setDuration(data.duration)
    }

    //Patch duration state to json-server when duration state changes
    useEffect(() => {
        fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                duration: duration,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    }, [duration, props.id])


    // Timer logic
    useEffect(() => {
        //Empty variable, used to assign setInterval
        let interval = null;

        //IF task is active, change duration state to current duration value + 1000 & set item to localStorage indicating task is active
        if(isTaskActive) {
            interval = setInterval(() => {
                setDuration((duration) => duration + 1000);
                localStorage.setItem(`task${props.id}active`, true)
            }, 1000)
        //ELSE remove item from localStorage that indicates task is active & clear interval
        }else {
            localStorage.removeItem(`task${props.id}active`)
            clearInterval(interval)
        }
        return () => {
            localStorage.removeItem(`task${props.id}active`)
            clearInterval(interval);
        }
    }, [isTaskActive, props.id])

    //Patch new task duration to localStorage
    window.onbeforeunload = () => {
        isTaskActive
            ? localStorage.setItem(`task${props.id}windowCloseTime`, new Date())
            : localStorage.removeItem(`task${props.id}windowCloseTime`)
    }

    // Empty variable, used to save clicked category index
    let tempVar = null

    // Category list controller
    const openCategoryList = index => {
        //IF categoryList display type is none, set display type to flex.
        //ELSE set display type to none.
        document.getElementById('categoryList').style.display !== 'flex'
            ? document.getElementById('categoryList').style.display = 'flex'
            : document.getElementById('categoryList').style.display = 'none'

        //Clicked category name y position minus offset.
        const posY = document.getElementById(`taskCategory${index}`).getBoundingClientRect().y * 0.79

        //Set categoryList top value to posY.
        document.getElementById('categoryList').style.top = `${posY}px`

        //Set tempVar to index argument.
        tempVar = index
    }

    //Get all saved categories from json-server
    const getCategories = async () => {
        let tempList = []

        const res = await fetch('http://127.0.0.1:3010/categories/0')
        const data = await res.json()
        
        for(let i = 0; i < data.categoryList.length; i++) {
            tempList[i] = data.categoryList[i]
        }

        setCategoryList(tempList)
    }

    const changeCategory = async (index) => {
        document.getElementById(`taskCategory${tempVar}`).innerHTML = document.getElementById(`categoryListItem${index}`).innerText
        document.getElementById('categoryList').style.display = 'none'

        const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}/`)
        const data = await res.json()

        let tempList = []
        for(let i = 0; i < data.categoryList.length; i++) {
            i !== tempVar
                ? tempList[i] = data.categoryList[i]
                : tempList[i] = document.getElementById(`categoryListItem${index}`).innerText
        }

        fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                categoryList: tempList,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })

        tempVar = null
    }

    //Add new category to global category list in json-server
    const addCategory = async (e) => {
        if(e.keyCode !== 13) return

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

        //Get updated category list
        getCategories()

        //Fetch task category list
        const res2 = await fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}/`)
        const data2 = await res2.json()

        //Second temp list -> task category list plus new category
        let tempList2 = []
        for(let i = 0; i < data2.categoryList.length; i++) {
            i !== tempVar
                ? tempList2[i] = data2.categoryList[i]
                : tempList2[i] = document.getElementById('newCategory').value
        }

        //Patch second temp list containing new category to task category list in json-server
        await fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                categoryList: tempList2,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })

        tempVar = null

        document.getElementById('categoryList').style.display = 'none'
        document.getElementById('newCategory').value = ''
    }

    return(
        <div id='task'>
            <section>
                <h3 id={'taskName' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.name}</h3>
                {
                    props.categoryList.map((res, index) => <h4 id={`taskCategory${index}`} onClick={() => {openCategoryList(index)}} key={index}>{res}</h4>)
                }
                <ul id='categoryList'>
                    {
                        categoryList.map((res, index) => <li id={`categoryListItem${index}`} key={index} onClick={() => {changeCategory(index)}}>{res}</li>)
                    }
                    <input id='newCategory' placeholder='New category' autoComplete='off' onKeyUp={(e) => {addCategory(e)}} />
                </ul>
            </section>
            <section>
                <p id={'taskDescription' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.description}</p>
            </section>
            <section>
                <h5 id='taskDurationCounter' className={isTaskActive ? 'counterActive' : 'counterNotActive'} onClick={() => {isTaskActive ? setIsTaskActive(null) : setIsTaskActive(true)}}>{Math.floor((duration / (1000 * 60 * 60)) % 24)}h {Math.floor((duration / (1000 * 60)) % 60).toFixed(0)}min {((duration % 60000) / 1000).toFixed(0)}s</h5>
                <span>
                    <h6 id={'taskFinishDate' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.finishDate}</h6>
                    <h6>&nbsp;klo&nbsp;</h6>
                    <h6 id={'taskFinishTime' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.finishTime}</h6>
                </span>
            </section>
        </div>
    )
}
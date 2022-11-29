import { useEffect, useState } from 'react'
import { getDuration } from '../../methods/getDuration'
import { taskDetailsListener } from '../../methods/taskDetailsListener'
import { getCategories } from '../../methods/getCategories'
import './Task.css'
import { updateDuration } from '../../methods/updateDuration'
import { openCategoryList } from '../../methods/openCategoryList'
import { changeCategory } from '../../methods/changeCategory'
import { addGlobalCategory } from '../../methods/addGlobalCategory'
import { addTaskCategory } from '../../methods/addTaskCategory'

export default function Task(props) {
    //Check if task is currently active
    const [isTaskActive, setIsTaskActive] = useState(localStorage.getItem(`task${props.id}windowCloseTime`) !== null
                                                        ? true
                                                        : false)

    //Current task duration
    const [duration, setDuration] = useState(Number(props.duration))

    //List of saved categories
    const [categoryList, setCategoryList] = useState([])

    const [tempVar, setTempVar] = useState()

    useEffect(() => {
        (async () => {
            setDuration(await getDuration(props.id))
            setCategoryList(await getCategories())
            taskDetailsListener(props.id)
        })()
    }, [])

    //Patch duration state to json-server when duration state changes
    useEffect(() => {
        updateDuration(props.id, duration)
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

    const addCategory = async (e) => {
        if(e.keyCode !== 13) return

        //Add new category to global category list
        await addGlobalCategory(tempVar)

        //Get updated category list
        setCategoryList(await getCategories())

        //Add new category to task category list
        await addTaskCategory(props.id, tempVar)

        setTempVar(null)

        document.getElementById('categoryList').style.display = 'none'
        document.getElementById('newCategory').value = ''
    }

    return(
        <div id='task'>
            <section>
                <h3 id={'taskName' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.name}</h3>
                {
                    props.categoryList.map((res, index) => <h4 id={`taskCategory${index}`} onClick={(e) => {setTempVar(openCategoryList(index, e))}} key={index}>{res}</h4>)
                }
                <ul id='categoryList'>
                    {
                        categoryList.map((res, index) => <li id={`categoryListItem${index}`} key={index} onClick={() => {setTempVar(changeCategory(index, tempVar, props.id))}}>{res}</li>)
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
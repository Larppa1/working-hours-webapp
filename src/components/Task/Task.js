import { useEffect, useState } from 'react'
import './Task.css'

export default function Task(props) {
    const [isTaskActive, setIsTaskActive] = useState(false)
    const [duration, setDuration] = useState(Number(props.duration))

    useEffect(() => {
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
        
        //Listen to task description changes and patch new name to json-server
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

        //Listen to task finish date changes and patch new name to json-server
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

        //Listen to task finish time changes and patch new name to json-server
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

    useEffect(() => {
        let interval = null;

        isTaskActive
            ? interval = setInterval(() => {
                setDuration((duration) => duration + 1000);
            }, 1000)
            : clearInterval(interval)
        return () => {
            clearInterval(interval);
        }
    }, [isTaskActive])

    //Patch updated task duration value to json-server
    const patchDurationValue = () => {
        setIsTaskActive(false)
        fetch(`http://127.0.0.1:3010/upcomingTasks/${props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                duration: duration,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    }

    return(
        <div id='task'>
            <section>
                <h3 id={'taskName' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.name}</h3>
                {
                    props.categoryList.map((res, index) => <h4 id='taskCategory' key={index}>{res}</h4>)
                }
            </section>
            <section>
                <p id={'taskDescription' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.description}</p>
            </section>
            <section>
                <h5 id='taskDurationCounter' className={isTaskActive ? 'counterActive' : 'counterNotActive'} onClick={() => {isTaskActive ? patchDurationValue() : setIsTaskActive(true)}}>{Math.floor((duration / (1000 * 60 * 60)) % 24)}h {Math.floor((duration / (1000 * 60)) % 60).toFixed(0)}min {((duration % 60000) / 1000).toFixed(0)}s</h5>
                <span>
                    <h6 id={'taskFinishDate' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.finishDate}</h6>
                    <h6>&nbsp;klo&nbsp;</h6>
                    <h6 id={'taskFinishTime' + props.id} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{props.finishTime}</h6>
                </span>
            </section>
        </div>
    )
}
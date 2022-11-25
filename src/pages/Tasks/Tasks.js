import './Tasks.css'
import { useEffect, useState } from 'react'
import Task from '../../components/Task/Task'

export default function Tasks() {
    //State for list of upcoming tasks
    const [upcomingTaskList, setUpcomingTaskList] = useState([])

    //Local value to set new id for added tasks
    let newId = null

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        //Create temp array for fetched data
        let tempList = []

        //Get upcoming tasks data
        const response = await fetch('http://127.0.0.1:3010/upcomingTasks')
        const result = await response.json()

        //Set fetched data to temp array
        for(let i = 0; i < result.length; i++) {
            tempList[i] = result[i]
        }

        //Set upcomingTaskList state to temp array
        setUpcomingTaskList(tempList)
    }

    const addTask = async () => {
        //Get auto-incrementing id for new task
        await fetch('http://127.0.0.1:3010/newTaskId')
            .then(res => res.json())
            .then(data => newId = data.id)
            .catch(err => console.log(err))
        
        //Post new task
        await fetch('http://127.0.0.1:3010/upcomingTasks', {
            method: 'POST',
            body: JSON.stringify({
                id: newId,
                name: "Test",
                category: "Second",
                description: "Test task.",
                finishDate: "24.11.2022",
                finishTime: "23:59:59"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        //Auto-increment new task id
        newId++
        
        //Patch new task id
        await fetch('http://127.0.0.1:3010/newTaskId', {
            method: 'PATCH',
            body: JSON.stringify({
                id: newId,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })

        //Set local variable newId to null and call getTasks method
        newId = null
        getTasks()
    }

    return(
        <div id='tasks'>
            <label htmlFor="my-modal" className="btn">New task</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn" onClick={addTask}>Add</label>
                    </div>
                </div>
            </div>
            <section id='upcomingTasksView' className='no-scrollbar'>
                <h2>Upcoming</h2>
                    {
                        upcomingTaskList.map((res, index) => <Task key={index} id={res.id} name={res.name} categoryList={res.categoryList} description={res.description} duration={res.duration} finishDate={res.finishDate} finishTime={res.finishTime} />)
                    }
            </section>
            <section id='endedTasksView' className='no-scrollbar'>
                <h2>Archive</h2>
            </section>
        </div>
    )
}
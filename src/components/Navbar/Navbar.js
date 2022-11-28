import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [upcomingTaskList, setUpcomingTaskList] = useState([])
    const location = useLocation()

    useEffect(() => {
        getTasks()
    }, [])

    //Get all upcoming tasks from json-server
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

    //Set window close time for all active tasks in localStorage, used for calculating duration when not inside Tasks page
    const setWindowCloseTime = () => {
        if(location.pathname === '/tasks') {
            for(let i = 0; i < upcomingTaskList.length; i++) {
                if(localStorage.getItem(`task${upcomingTaskList[i].id}active`)) {
                    localStorage.setItem(`task${upcomingTaskList[i].id}windowCloseTime`, new Date())
                    console.log(localStorage.getItem(`task${upcomingTaskList[i].id}windowCloseTime`))
                }else {
                    localStorage.removeItem(`task${upcomingTaskList[i].id}windowCloseTime`)
                }
            }
        }
    }

    //Calculate time outside Tasks page and patch duration to json-server
    const updateTaskDuration = async () => {
        //TODO: Get updated duration from json-server

        if(location.pathname !== '/tasks') {
            for(let i = 0; i < upcomingTaskList.length; i++) {
                if(localStorage.getItem(`task${upcomingTaskList[i].id}windowCloseTime`) !== null) {
                    const timeBetween = new Date().getTime() - new Date(localStorage.getItem(`task${upcomingTaskList[i].id}windowCloseTime`)).getTime()

                    const res = await fetch(`http://127.0.0.1:3010/upcomingTasks/${i + 1}`)
                    const data = await res.json()

                    await fetch(`http://127.0.0.1:3010/upcomingTasks/${i + 1}`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                duration: data.duration + timeBetween,
                            }),
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8',
                            },
                        })
                }
                
            }
        }
    }

    if(window.innerWidth < 768) {
        return(
            <div></div>
        )
    }else {
        return(
            <div id='navbar' className="navbar">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl" style={{color: 'white'}}>Working Hours</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                    <li onClick={setWindowCloseTime}><Link to='/'>Dashboard</Link></li>
                    <li onClick={updateTaskDuration}><Link to='/tasks'>Tasks</Link></li>
                    <li onClick={setWindowCloseTime}><Link to='/statistics'>Statistics</Link></li>
                    <li onClick={setWindowCloseTime} tabIndex={0}>
                        <a>
                        More
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2 bg-base-100 dropdown">
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/settings'>Settings</Link></li>
                        </ul>
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}
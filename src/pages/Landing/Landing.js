import './Landing.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Task from '../../components/Task/Task'

export default function Landing() {
    const [selectedDate, setSelectedDate] = useState('')
    let tasksForToday = false

    return(
        <div id='landing'>
            <section>
                <h2 style={{color: 'black'}}>Calendar</h2>
                <Calendar onChange={(value, event) => {
                    setSelectedDate((value.toString()).slice(0, 16))
                    }}
                />
            </section>
            <section className='no-scrollbar'>
                {
                    tasksForToday === false
                        ? <h2 style={{color: 'black'}}>Active tasks</h2>
                        : <Task />
                }
            </section>
            <section>
            <h2 style={{color: 'black'}}>Performance</h2>
            </section>
        </div>
    )
}
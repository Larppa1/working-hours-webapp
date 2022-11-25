import { useEffect, useState } from 'react'
import './Settings.css'

export default function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.body.className = theme
        console.log(theme)
    }, [theme])

    const changeTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return(
        <div>
            <button id='changeThemeBtn' onClick={changeTheme}>Change theme</button>
        </div>
    )
}
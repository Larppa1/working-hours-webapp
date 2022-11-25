import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/tasks'>Tasks</Link></li>
                    <li><Link to='/statistics'>Statistics</Link></li>
                    <li tabIndex={0}>
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
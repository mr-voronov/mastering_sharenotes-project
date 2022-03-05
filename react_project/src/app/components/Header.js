import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <header>
            <nav>
                <li><NavLink to="/">Main</NavLink></li>
                <li><NavLink to="/create">Create note</NavLink></li>
                <li><NavLink to="/note">Read note</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </nav>
        </header>
    );
}

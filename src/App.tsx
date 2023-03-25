import React from 'react';
import { utilList } from './list';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
    return (
        <div className="App">
            {Object.entries(utilList).map(([route, { name, Icon }]) => (
                <Link key={route} to={route}>
                    <Icon />
                    {name}
                </Link>
            ))}
        </div>
    );
}

export default App;

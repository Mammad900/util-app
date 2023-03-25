import React from 'react';
import { utilList } from './list';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
    return (
        <div className="App">
            {Object.entries(utilList).map(([route, { name, icon }]) => (
                <Link key={route} to={route}>
                    <FontAwesomeIcon icon={icon} />
                    {name}
                </Link>
            ))}
        </div>
    );
}

export default App;

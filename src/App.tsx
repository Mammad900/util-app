import React from 'react';
import { utilList } from './list';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="App navigation-list">
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

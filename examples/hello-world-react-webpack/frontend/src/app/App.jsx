import React from 'react';
import './App.css';

function App({ userId }) {
    return (
        <>
            <div className="hello-world-div">
                <h3>Hello world!</h3>
            </div>
            <div className="current-user-div">
                <p>
                    <b>Initiating user</b>: {userId}
                </p>
            </div>
        </>
    )
}

export default App;

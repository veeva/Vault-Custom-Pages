import React from 'react';
import './App.css'

export default function App({ userId }) {

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
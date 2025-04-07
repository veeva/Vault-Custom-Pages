import React from 'react';
import './App.css';

export default function App({ userId }: { userId: string }) {
    return (
        <>
            <div className='hello-world-container'>
                <h3>Hello world!</h3>
            </div>
            <div className='current-user-container'>
                <b>Initiating user</b>: {userId}
            </div>
        </>
    );
}

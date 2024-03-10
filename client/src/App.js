import './App.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [accessToken, setAccessToken] = useState('');

    return (
        <div className='container'>
            <Outlet context={[accessToken, setAccessToken]} />
        </div>
    );
}

export default App;

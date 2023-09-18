import { useEffect, useState } from 'react';
import axios from 'axios';

import './UserList.css';

import User from './User';
import Loading from './Loading';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(
                    'https://jsonplaceholder.typicode.com/users'
                );
                if (res.status === 200) {
                    setUsers(res.data);
                } else {
                    throw new Error(
                        `Failed to fetch data with status : ${res.status}`
                    );
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, []);
    return (
        <div className="user-list">
            <h1>User List</h1>
            {isLoading && <Loading />}
            {error && <p className="error">{error}</p>}
            <ul>
                {users.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;

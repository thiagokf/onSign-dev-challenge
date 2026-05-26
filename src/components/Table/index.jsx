import React, { useState } from 'react'
import classes from "./table.module.css"

const Table = ({ users, friends = [], interests = {} }) => {
    const [sortDirection, setSortDirection] = useState('asc');

    const sortedUsers = [...users].sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const toggleSort = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    function getDirectFriends(userId) {
        const directFriends = new Set()
        friends.forEach(([friendId1, friendId2]) => {
            if (friendId1 === userId) {
                directFriends.add(friendId2)
            }
        })
        return directFriends
    }

    function getDirectInterests(userId) {
        const directInterests = new Set()
        const usersInterests = Object.entries(interests)
        usersInterests.forEach(([interest, userInterest]) => {
            if (userInterest.includes(userId)) {
                directInterests.add(interest)
            }
        })
        return directInterests
    }

    function getFriendsSuggestion(userId) {
        const directFriends = getDirectFriends(userId)

        const suggestedFriends = new Set()
        friends.forEach(([friendId1, friendId2]) => {
            if (directFriends.has(friendId1) && friendId2 !== userId && !directFriends.has(friendId2)) {
                suggestedFriends.add(friendId2)
            }
        })

        const suggestedNames = Array.from(suggestedFriends).map(id => {
            const user = users.find(u => u.id === id)
            return user.name
        })

        return suggestedNames.length > 0 ? suggestedNames.join(', ') : ''
    }

    function getInterestsSuggestions(userId) {
        const directInterests = getDirectInterests(userId)

        const friendsInterests = new Set()
        const directFriends = getDirectFriends(userId)
        directFriends.forEach(friendId => {
            const userInterests = getDirectInterests(friendId)
            userInterests.forEach(interest => {
                friendsInterests.add(interest)
            })
        })

        const suggestedInterests = Array.from(friendsInterests).filter(
            interest => !directInterests.has(interest)
        )

        return suggestedInterests.length > 0 ? suggestedInterests.join(', ') : ''
    }

    return (
        <div className={classes.body}>
            <div className={classes.tableTitle}>
                <p>Users</p>
            </div>
            <table className={`${classes.table} ${classes.striped}`}>
                <thead>
                    <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Suggested Friends</th>
                        <th scope="col">Suggested Interests</th>
                    </tr>
                </thead>
                <tbody className={classes.bodyTable}>
                    {sortedUsers.map(user => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{getFriendsSuggestion(user.id)}</td>
                            <td>{getInterestsSuggestions(user.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={classes.button}>
                <span>Sort: </span>
                <button className={classes.buttonSort} onClick={toggleSort}>
                    {sortDirection === 'asc' ? 'Name A-Z' : 'Name Z-A'}
                </button>
            </div>
        </div>
    )
}

export default Table

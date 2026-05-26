import React, { useState, useEffect, useRef } from 'react'
import Table from '../../components/Table/index'

const Home = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  async function loadUsers() {
    const maxRetries = 2;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const token = import.meta.env.VITE_API_TOKEN;
    const url = `https://api.onsign.tv/dev-challenge/?access_token=${token}`;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const res = await fetch(url);

        if (res.ok && res.status === 200) {
          const data = await res.json()
          setUsers(data)
          setError(false)
          return;
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }

      if (attempt < maxRetries) {
        await delay(1000);
      }
    }

    setError(true)
  }

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    loadUsers()
  }, [])

  return (
    <>
      <div style={{ color: '#000000ff', margin: '10px' }}>{users ? 'Data loaded' : 'Loading...'}</div>
      {error && (
        <div style={{ color: 'red', marginTop: '12px' }}>
          Failed to load data.
        </div>
      )}
      {users && <Table users={users.users || []} friends={users.friends || []} interests={users.interests || {}} />}
    </>
  )
}

export default Home

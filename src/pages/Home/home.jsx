import React, { useState, useEffect, useRef } from 'react'
import Table from '../../components/Table/table'

const Home = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const fetchedRef = useRef(false);

  async function retry(callback, maxRetries) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let attemp = 0; attemp <= maxRetries; attemp ++){
      try{
        return await callback();
      } catch (error) {
        console.error("Fetch error:")
        console.log(`Attemp ${attemp + 1} failed.`)
      }
      await delay(1000)
    }
    setError(true)
  }

  async function loadUsers() {
    const maxRetries = 3;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const token = import.meta.env.VITE_ONSIGN_API_ACCESS_TOKEN;
    const url = `https://api.onsign.tv/dev-challenge/?access_token=${token}`;

    const data = await retry(async () => {
      const res = await fetch(url);
      return res.json()
    }, 3)
    setUsers(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    loadUsers()
  }, [])

  return (
    <>
      {isLoading && (
        <div style={{ color: '#000000ff', margin: '10px' }}>Loading...</div>
      )}
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

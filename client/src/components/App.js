
import React, { useState, useEffect } from 'react'
import Navigation from './Navigation/Navigation';
import './App.css';

function App() {
  const [user, setUser] = useState(null)
  const [businesses, setBusinesses] = useState({})
  console.log(user)
  console.log(businesses)

  useEffect(() => {
    fetchUser()
    fetchBusinesses()
  }, [])

  const fetchBusinesses = () => {
    fetch('/businesses')
      .then(resp => resp.json())
      .then(businessesData => setBusinesses(businessesData))
  }

  const fetchUser = () => {
    fetch("/authorized")
      .then(resp => {
        if (resp.ok) {
          resp.json()
            .then(data => {
              setUser(data)
            })
        } else {
          setUser(null)
        }
      })
  }

  const updateUser = (user) => setUser(user)
  return (
    <div className="App overflow-x-hidden vh-100">
      <Navigation
        updateUser={updateUser}
        businesses={businesses}
        user={user}
      />
    </div>
  );
}

export default App;

import React from 'react'
import { FormControl } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext';

export default function NavDropdown() {
  const { setQueryString } = useAuth();
  
  const clickHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <form className="d-flex">
        <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(e) => {
          setQueryString(e.target.value)
          // debouncedIssueSearch()
        }} />
        <button variant="outline-success" onClick={clickHandler} >Search</button>
      </form></div>
  )
}

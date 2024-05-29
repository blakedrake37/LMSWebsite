import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
              <a className="navbar-brand" href="http://localhost:3000/">Library Management System</a>

                  <form className="form-inline">
                    
                    <input className="" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>
            </nav>
            
        </header>
    </div>
  )
}

export default HeaderComponent
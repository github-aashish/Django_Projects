import {Link} from 'react-router-dom'
import { useState } from 'react';

function Header(){
  const [searchString,setSearchString] = useState({
    string : ''
});
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  const handleChange = (event) =>{
    setSearchString({
        ...searchString,
        [event.target.name]:event.target.value
    }
    );
}
  const submitCourse = ()=>{
    if(searchString.string !==''){
      window.location.href = '/search/'+searchString.string
    }
  }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container">
    <Link className="navbar-brand" to="/">Learn Hub</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {/*<form className='d-flex'>*/}
            <p className='d-flex'>
              <input onChange={handleChange} name='string' className='form-control me-2' type="search" placeholder="Search Courses " aria-label="Search"/>
              <button onClick={submitCourse} className='btn btn-warning' type='button'>Search</button>
            </p>
            {/*</form>*/}
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/all-courses">Courses</Link>
        {studentLoginStatus!=='true' && 
        <li className="nav-item dropdown">
          <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Teacher</a>
        <ul className="dropdown-menu" aria-labelledby='navbarDropdown'>
          {teacherLoginStatus!=='true' && 
              <><li> <Link className="dropdown-item" to="/teacher-login">Login</Link></li>
          <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li></>
        }
          {teacherLoginStatus ==='true' && <><li><Link to="/teacher-dashboard" className="dropdown-item">Dashboard</Link></li>
          <li><Link to="/teacher-logout" className="dropdown-item">Logout</Link></li></>}
        </ul>
        </li>
}
{teacherLoginStatus!=='true' &&
        <li className="nav-item dropdown">
          <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">User</a>
        <ul className="dropdown-menu" aria-labelledby='navbarDropdown'>
        {studentLoginStatus!=='true' && 
              <><li> <Link className="dropdown-item" to="/user-login">Login</Link></li>
          <li><Link className="dropdown-item" to="/user-register">Register</Link></li></>
        }
          {studentLoginStatus ==='true' && <><li><Link to="/user-dashboard" className="dropdown-item">Dashboard</Link></li>
          <li><Link to="/user-logout" className="dropdown-item">Logout</Link></li></>}
        </ul>
        </li>
}
      </div>
    </div>
  </div>
</nav>
    );
}

export default Header;
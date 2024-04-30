import {Link} from 'react-router-dom'

function Header(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container">
    <Link className="navbar-brand" to="/">Learn Hub</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <a className="nav-link" href="/">Courses</a>
        <a className="nav-link" href="/">Teachers</a>
        <li className="nav-item dropdown">
          <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">User</a>
        <ul className="dropdown-menu" aria-labelledby='navbarDropdown'>
          <li> <Link className="dropdown-item" to="/user-login">Login</Link></li>
          <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link to="/user-dashboard" className="dropdown-item">Dashboard</Link></li>
          <li><a href="/" className="dropdown-item">Logout</a></li>
        </ul>
        </li>
       
        
      </div>
    </div>
  </div>
</nav>
    );
}

export default Header;
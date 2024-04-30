import {Link} from 'react-router-dom'

function Sidebar(){
    return(
        <div className="card">
        <div className="list-group list-group-flush">
            <h5><Link to="/user-dashboard" className="list-group-item list-group-item-action card-header">Dashboard</Link></h5>
            <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
            <Link to="/favourite-courses" className="list-group-item list-group-item-action">Favourite Courses</Link>
            <Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
            <Link to="/" className="list-group-item list-group-item-action">Profile Settings</Link>
            <Link to="/" className="list-group-item list-group-item-action">Change Password</Link>
            <Link to="/" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    </div>
    );
}

export default Sidebar;
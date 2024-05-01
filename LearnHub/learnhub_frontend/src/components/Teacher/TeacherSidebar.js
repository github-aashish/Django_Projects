import {Link} from 'react-router-dom'

function TeacherSidebar(){
    return(
        <div className="card">
        <div className="list-group list-group-flush">
            <h5><Link to="/user-dashboard" className="list-group-item list-group-item-action card-header">Dashboard</Link></h5>
            <Link to="/teacher-courses" className="list-group-item list-group-item-action">My Courses</Link>
            <Link to="/add-courses" className="list-group-item list-group-item-action">Add Courses</Link>
            <Link to="/teacher-users" className="list-group-item list-group-item-action">My Users</Link>
            <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Settings</Link>
            <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
            <Link to="/teacher-login" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    </div>
    );
}

export default TeacherSidebar;
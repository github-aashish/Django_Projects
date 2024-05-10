import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
const baseUrl = 'http://127.0.0.1:8000/api';

function Sidebar(){

    const [notifData,setNotifData] = useState([]);
    const studentId= localStorage.getItem('studentId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/fetch-all-notifications/'+studentId).then((res)=>{
                setNotifData(res.data);
            })
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return(
        <div className="card">
        <div className="list-group list-group-flush">
            <h5><Link to="/user-dashboard" className="list-group-item list-group-item-action card-header">Dashboard</Link></h5>
            <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
            <Link to="/favourite-courses" className="list-group-item list-group-item-action">Favourite Courses</Link>
            <Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
            <Link to="/assignments" className="list-group-item list-group-item-action">Assignments <span className='float-end badge bg-danger'>{notifData.length}</span></Link>
            <Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Settings</Link>
            <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
            <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    </div>
    );
}
export default Sidebar;
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './validation.css'
const baseUrl = 'http://127.0.0.1:8000/api';

function Dashboard(){
    const [dashboardData,setDashboardData] = useState([])
    const studentId = localStorage.getItem('studentId')
    const studentName = localStorage.getItem('studentName')
    const stuImg = localStorage.getItem('studentImage')

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/dashboard/'+ studentId).then((res)=>{
                console.log(res);
                setDashboardData(res.data);
            })
        }
        catch(error){
            console.log(error);
        }
    },[]);
    
    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <Sidebar />
</aside>
<section className="col-md-9">
<h2><img className='p_image' src={dashboardData.profile_image} alt="Student Image" />
    Welcome {studentName}
</h2>
<div className="row">
        <div className="col-md-4">
            <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                <div className="card-body">
                    <h3><Link to="/my-courses">{dashboardData.total_enroll}</Link></h3>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-success">
                <h5 className="card-header bg-success text-white">Favourite Courses</h5>
                <div className="card-body">
                    <h3><Link to="/favourite-courses">{dashboardData.total_favourite}</Link></h3>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-info">
                <h5 className="card-header bg-info text-white">Assignments</h5>
                <div className="card-body">
                    <h4><Link to="/assignments"><span className='badge bg-success'>Completed:{dashboardData.total_completed}</span></Link> <Link to="/assignments"><span className='badge bg-warning ms-2 text-black'>Pending:{dashboardData.total_pending}</span></Link></h4>
                </div>
            </div>
        </div>
    </div>
</section>
            </div>
        </div>
    );
}

export default Dashboard;
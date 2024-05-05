import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function AllModules(){

    const [moduleData, setModuleData] = useState([]);
    const {course_id} = useParams();

    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/course-modules/'+course_id).then((res)=>{
                //console.log(res.data);
                setModuleData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">All Modules</h5>
        <div className="card-body">
        <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Video</th>
                <th>Remarks</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {moduleData.map((module,index )=>
            <tr>
            <td><Link to="#">{module.title}</Link></td>
            <td>
                <video controls width="250">
                    <source src={module.video} type="video/webm" />
                    <source src={module.video} type="video/mp4" />
                    Sorry Your Browser Doesn't Support Embeddeb Videos!!!
                </video>
            </td>
            <td>{module.remarks}</td>
            <td>
                <button className='btn btn-danger '>Delete</button>
                <button className='btn btn-info ms-2'>Edit</button>
            </td>
            </tr>
            )}
        </tbody>
            </table>
        </div>
    </div>
</section>
            </div>
        </div>
    );
}

export default AllModules;
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';


function RecommendedCourses(){
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId')

    //fetch students when page loads
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/fetch-recommended-courses/'+studentId).then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);


    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <Sidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Recommended Courses</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Technologies Contains</th>
            </tr>
        </thead>
        <tbody>
        {courseData.map((row,index )=>
            <tr>
            <td><Link to={`/detail/${row.id}`}>{row.title}</Link></td>
            <td>{row.technologies}</td>
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

export default RecommendedCourses;
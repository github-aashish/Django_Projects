import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';


function EnrolledStudents(){

    const [studentData, setStudentData] = useState([]);
    

    const {course_id} = useParams();
    //console.log(teacherId)

    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/fetch-enroll-students/'+course_id).then((res)=>{
                setStudentData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);
    //console.log(courseData);

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Enrolled Student(s)</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Interests</th>
            </tr>
        </thead>
        <tbody>
            {studentData.map((row,index )=>
            <tr>
            <td>{row.student.full_name}</td>
            <td>{row.student.email}</td>
            <td>{row.student.username}</td>
            <td>
            {row.student.interested_categories}
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

export default EnrolledStudents;
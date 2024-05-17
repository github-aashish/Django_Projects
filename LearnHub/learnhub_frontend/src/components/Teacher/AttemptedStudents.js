import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckQuizinCourse from './CheckQuizinCourse'
const baseUrl = 'http://127.0.0.1:8000/api';


function AttemptedStudents(){

    const [studentData, setStudentData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    const {quiz_id} = useParams();

    useEffect (()=>{
        document.title = "Attempted Quiz";
        try{
            axios.get(baseUrl+'/attempted-quiz/'+quiz_id).then((res)=>{
                setStudentData(res.data);
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
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Students List</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>  
            </tr>
        </thead>
        <tbody>
            {studentData.map((row,index )=>
            
            <tr>
            <td>{row.student.full_name}</td>
            <td>{row.student.email}</td>
            <td>{row.student.username}</td>
            <td><Link to="#">Quiz Result</Link></td>
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

export default AttemptedStudents;
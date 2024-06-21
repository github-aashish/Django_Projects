import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult';
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
            <td>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#resultModal${row.id}`}>Quiz Result</button>
                <div className="modal fade modal-lg" id={`resultModal${row.id}`} tabIndex="-1" aria-labelledby='exampleModalLabel' aria-hidden="true">
                    <QuizResult quiz={row.quiz.id} student={row.student.id} />
                </div>

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

export default AttemptedStudents;
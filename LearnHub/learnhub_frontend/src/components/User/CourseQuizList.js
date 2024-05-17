import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CheckQuizAttemp from './CheckQuizAttempt';
const baseUrl = 'http://127.0.0.1:8000/api';


function CourseQuizList(){
    const [quizData, setQuizData] = useState([]);
    const studentId = localStorage.getItem('studentId')

    const {course_id} = useParams();

    useEffect (()=>{
        document.title = "Quiz List";
        try{
            axios.get(baseUrl+'/fetch-assigned-quiz/'+course_id).then((res)=>{
                setQuizData(res.data);
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
        <h5 className="card-header">Quiz List</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Title</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {quizData.map((row,index)=>
            <tr>
            <td>{row.quiz.title}</td>
            <CheckQuizAttemp quiz={row.quiz.id} student={studentId}/>
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

export default CourseQuizList;
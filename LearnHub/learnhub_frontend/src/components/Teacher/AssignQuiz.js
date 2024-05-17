import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckQuizinCourse from './CheckQuizinCourse'
const baseUrl = 'http://127.0.0.1:8000/api';


function AssignQuiz(){

    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    const {course_id} = useParams();

    useEffect (()=>{
        document.title = "Assign Quiz";
        try{
            axios.get(baseUrl+'/teacher-quiz/'+teacherId).then((res)=>{
                setQuizData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/course/'+course_id).then((res)=>{
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
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Assign Quiz <span className='text-primary'>({courseData.title})</span></h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {quizData.map((row,index )=>
            
            <tr>
            <td><Link to={`/all-questions/` + row.id}>{row.title}</Link></td>
            <CheckQuizinCourse quiz={row.id} course={course_id}/>
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

export default AssignQuiz;
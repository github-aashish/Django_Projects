import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';


function AllQuiz(){

    const [quizData, setQuizData] = useState([]);
    const [totalquiz, settotalQuiz] = useState(0);

    const teacherId = localStorage.getItem('teacherId')

    useEffect (()=>{
        document.title = "All Quiz";
        try{
            axios.get(baseUrl+'/teacher-quiz/'+teacherId).then((res)=>{
                settotalQuiz(res.data.length);
                setQuizData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const handleDeleteClick = (quiz_id)=>{
        Swal.fire({
            title : 'Confirm!',
            text : 'Do you want to Delete this?',
            icon : 'info',
            confirmButtonText : 'Continue',
            showCancelButton : true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/quiz/'+quiz_id).then((res)=>{
                        Swal.fire('success','Data has been deleted');
                        try{
                            axios.get(baseUrl+'/teacher-quiz/'+teacherId).then((res)=>{
                                settotalQuiz(res.data.length);
                                setQuizData(res.data);
                            });
                        }
                        catch(error){
                            console.log(error);
                        }
                    });
                    
                }
                catch(error){
                    Swal.fire('error','Quiz has not been deleted!!!');
                }
            }
            else{
                Swal.fire('error','Quiz has not been deleted!!!');
            }
        });
};


    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">My Quiz ({totalquiz})</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Total Questions</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {quizData.map((quiz,index )=>
            <tr>
            <td><Link to={`/all-questions/` + quiz.id}>{quiz.title}</Link>
            </td>
            <td><Link to="#">30</Link></td>
            <td>
            <Link to={`/edit-quiz/` + quiz.id} className='btn btn-info btn-sm '>Edit</Link>
                <Link to={`/add-quiz-questions/` + quiz.id} className='btn btn-success btn-sm ms-2'>Add Questions</Link>
                <button onClick={()=>handleDeleteClick(quiz.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
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

export default AllQuiz;
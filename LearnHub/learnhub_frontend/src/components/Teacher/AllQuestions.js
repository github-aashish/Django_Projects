import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function AllQuestions(){

    const [questionData, setQuestionData] = useState([]);
    const [totalquestion, settotalQuestion] = useState(0);

    const {quiz_id} = useParams();

    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "Quiz Questions";
        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id).then((res)=>{
                settotalQuestion(res.data.length);
                setQuestionData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const Swal = require('sweetalert2');
    const handleDeleteClick = (question_id)=>{
            Swal.fire({
                title : 'Confirm!',
                text : 'Do you want to Delete this?',
                icon : 'info',
                confirmButtonText : 'Continue',
                showCancelButton : true
            }).then((result)=>{
                if(result.isConfirmed){
                    try{
                        axios.delete(baseUrl+'/question/'+question_id).then((res)=>{
                            Swal.fire('success','Data has been deleted');
                            try{
                                axios.get(baseUrl+'/quiz-questions/'+quiz_id).then((res)=>{
                                    settotalQuestion(res.data.length);
                                    setQuestionData(res.data);
                                });
                            }
                            catch(error){
                                console.log(error);
                            }
                        });
                        
                    }
                    catch(error){
                        Swal.fire('error','Data has not been deleted!!!');
                    }
                }
                else{
                    Swal.fire('error','Data has not been deleted!!!');
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">All Questions ({totalquestion}) <Link className='btn btn-success btn-sm float-end' to={`/add-quiz-questions/` + quiz_id}>Add Questions</Link></h5>
        <div className="card-body">
        <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {questionData.map((que,index )=>
            <tr>
            <td>{que.question}</td>
            <td>
                <Link to={`/edit-question/`+que.id} className='btn btn-info '><i className='bi bi-pencil-square'></i></Link>
                <button onClick={()=>handleDeleteClick(que.id)} className='btn btn-danger ms-1'><i className='bi bi-trash3'></i></button>
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

export default AllQuestions;
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';


function TakeQuiz(){
    const [questionData, setQuestionData] = useState([]);
    const {quiz_id} = useParams();
    const [moreQuestion, setMoreQuestion] = useState();
    const studentId = localStorage.getItem('studentId')

    //fetch students when page loads
    useEffect (()=>{
        document.title = "Quiz | Best Of Luck";
        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/1').then((res)=>{
                setQuestionData(res.data);
                console.log("Length of response:"+ res.data.length);
                if((res.data.length)===0){

                    setMoreQuestion('true');
                }
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const submitAnswer = (question, answer)=>{
            const _formData = new FormData();
            _formData.append('student',studentId);
            _formData.append('question',question);
            _formData.append('quiz',quiz_id);

            _formData.append('submitted_answer',answer);
            try{
                axios.post(baseUrl+'/attemp-quiz/',_formData).then((res)=>{
                    try{
                        axios.get(baseUrl+'/quiz-questions/'+quiz_id+'/next-question/'+question).then((res)=>{
                            setQuestionData(res.data);
                            console.log("Length of response:"+ res.data.length);

                            if((res.data.length)===0){
                                setMoreQuestion('true');
                            }
                        });
                    }
                    catch(error){
                        console.log(error);
                    }
                });
            }
            catch(error){
            }

    }

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <Sidebar />
</aside>
<section className="col-md-9">
        {moreQuestion === 'true' && 
        <>
            <h4 className='text-center text-success'>Done | No More Questions......</h4>
            <h4 className='text-center mt-5'><Link className='btn btn-sm btn-info' to="/user-dashboard"> Go to Dashboard </Link></h4>
            </>
        }
    {questionData.map((row,index)=>
    <>
    <h4 className='mb-3 border-bottom pb-1'>Quiz Title</h4>
    <div className="card">
        <h5 className="card-header">{row.question}</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <tbody>
            <tr>
                <td><button onClick={()=>submitAnswer(row.id, row.ans1)} className='btn btn-outline-secondary'>{row.ans1}</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>submitAnswer(row.id, row.ans2)} className='btn btn-outline-secondary'>{row.ans2}</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>submitAnswer(row.id, row.ans3)} className='btn btn-outline-secondary'>{row.ans3}</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>submitAnswer(row.id, row.ans4)} className='btn btn-outline-secondary'>{row.ans4}</button></td>
            </tr>

        </tbody>
            </table>

        </div>
    </div>
    </>
    )}
</section>
            </div>
        </div>
    );

}

export default TakeQuiz;
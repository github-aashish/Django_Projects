import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function AddQuizQuestions(){
    const [questionData, setQuestionData] = useState({
        question : '',
        ans1 : '',
        ans2 : '',
        ans3 : '',
        ans4 : '',
        right_ans:''
    }
    );
    const {quiz_id} = useParams();

    useEffect (()=>{
        document.title = "Add Question";})

    const handleChange =(event)=>{
        setQuestionData({
            ...questionData,[event.target.name]:event.target.value
        });
    };



    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('quiz', quiz_id);
        _formData.append('question', questionData.question);
        _formData.append('ans1', questionData.ans1);
        _formData.append('ans2', questionData.ans2);
        _formData.append('ans3', questionData.ans3);
        _formData.append('ans4', questionData.ans4);
        _formData.append('right_ans', questionData.right_ans);
        try{
            axios.post(baseUrl+'/quiz-questions/',_formData).then((res)=>{
                if(res.status===200 || res.status === 201){
                    Swal.fire({
                        title : 'Question Added Successfully',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                }
                setTimeout(()=>{
                    window.location.reload();
                },2000);
                })
            }
        catch(error){
            console.log(error);
        }

    };

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Add Questions</h5>
        <div className="card-body">
           {/* <form>*/} 
        <div className="mb-3">
        <label htmlFor="question" className="form-label">Question</label>
            <input type="text" onChange={handleChange} name="question" id="question" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="ans1" className="form-label">Ans 1</label>
        <textarea name="ans1" onChange={handleChange} className="form-control" id="ans1"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="ans2" className="form-label">Ans 2</label>
        <textarea name="ans2" onChange={handleChange} className="form-control" id="ans2"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="ans3" className="form-label">Ans 3</label>
        <textarea name="ans3" onChange={handleChange} className="form-control" id="ans3"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="ans4" className="form-label">Ans 4</label>
        <textarea name="ans4" onChange={handleChange} className="form-control" id="ans4"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="right_ans" className="form-label">Correct Answer</label>
        <textarea name="right_ans" onChange={handleChange} className="form-control" id="right_ans"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
      {/*</form> */}
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default AddQuizQuestions;
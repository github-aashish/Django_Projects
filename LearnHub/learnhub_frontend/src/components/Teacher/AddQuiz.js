import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';
function AddQuiz(){
    const teacherId = localStorage.getItem('teacherId')
    const [quizData, setQuizData] = useState({
            title : '',
            detail : ''
    }
    );


    const handleChange =(event)=>{
        setQuizData({
            ...quizData,[event.target.name]:event.target.value
        });
    };


    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);
        try{
            axios.post(baseUrl+'/quiz/',_formData).then((res)=>{
                if(res.status === 200 || res.status === 201){
                    Swal.fire({
                        title : 'Quiz Added Successfully',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                })
            }
        catch(error){
            console.log(error);
        }

    };

    //console.log(cats);

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Add Quiz</h5>
        <div className="card-body">
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={quizData.title} onChange={handleChange} name="title" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="desc" className="form-label">Detail</label>
        <textarea className="form-control" value={quizData.description} onChange={handleChange} name="detail" id="desc"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary' onClick={formSubmit}>Add</button>
        </div>
    </div>
</section>
            </div>
        </div>
    );
}

export default AddQuiz;
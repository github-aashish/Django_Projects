import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function AddAssignment(){
    const [assignmentData, setAssignmentData] = useState({
            title : '',
            detail : ''
    }
    );
    const {student_id} = useParams();
    const {teacher_id} = useParams();

    useEffect (()=>{
        document.title = "Add Assignment";})

    const handleChange =(event)=>{
        setAssignmentData({
            ...assignmentData,[event.target.name]:event.target.value
        });
    };


    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('teacher', teacher_id);
        _formData.append('student', student_id);
        _formData.append('title', assignmentData.title);
        _formData.append('detail', assignmentData.detail);
        _formData.append('student_status', false);
        try{
            axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id,_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : 'Assignment has been Added',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });

                    const _notifData = new FormData();
                    _notifData.append('teacher',teacher_id);
                    _notifData.append('student',student_id);
                    _notifData.append('notif_subject','assignment');
                    _notifData.append('notif_for','student');
                    axios.post(baseUrl+'/save-notification/',_notifData).then((res)=>{
                    console.log("Notification Added");
                    })
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
        <h5 className="card-header">Add Assignment</h5>
        <div className="card-body">
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={handleChange} name="title" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="detail" className="form-label">Detail</label>
        <textarea name="detail" onChange={handleChange} className="form-control" id="detail"></textarea>
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

export default AddAssignment;
//import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState,useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function ChangePassword(){

    const studentId = localStorage.getItem('studentId')
    const [studentData,setStudentData] = useState({
        'password':'',
    });

    const handleChange = (event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value   
        });
    };
    const studentLogin_Status = localStorage.getItem('studentLoginStatus');
    if(studentLogin_Status !== 'true'){
        window.location.href = '/user-login';
    };

    useEffect (()=>{
        document.title = "Change Password";
    });


    const SubmitForm = ()=>{
        const teacherFormData = new FormData();
        teacherFormData.append("password", studentData.password);
        try{
            axios.post(baseUrl+'/student/change-password/'+studentId +'/',teacherFormData)
            .then((res)=>{
                if(res.status===200){
                    Swal.fire({
                        title : 'Password has been Updated',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                }
                else{
                    alert("Oops Something went Wrong! Password Not Changed");
                }
                setTimeout(()=>{
                    window.location.reload();
                },2000);
            });
        }
        catch(error){
            console.log(error);
        }
        
    };



    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <Sidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Change Password</h5>
        <div className="card-body">
    <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
        <div className="col-sm-10">
            <input type="password" value={studentData.password} onChange={handleChange} id="inputPassword" name="password" className="form-control"/>
        </div>
    </div>
    <hr />
    <button onClick={SubmitForm} className='btn btn-primary'>Change</button>
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default ChangePassword;
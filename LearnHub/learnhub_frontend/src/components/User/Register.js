import axios from 'axios';
import {useEffect,useState } from "react";
import './validation.css'
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register(){
    useEffect(() =>{
        document.title = "Student Register";
    }
    );
    const [studentData,setStudentData] = useState({
        'full_name':'',
        'email':'',
        'username':'',
        'password':'',
        'interest':'',
        'status':''
    });

//Change Element Value
const handleChange = (event)=>{
    setStudentData({
        ...studentData,
        [event.target.name]:event.target.value   
    });}

    const SubmitForm = ()=>{
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("username", studentData.username);
        studentFormData.append("email", studentData.email);
        studentFormData.append("password", studentData.password);
        studentFormData.append("interested_categories", studentData.interest);
        if(chk_empty(studentData.full_name,studentData.email,studentData.username,studentData.password,studentData.interest)){
        if(validate(studentData.password)){
        try{
            axios.post(baseUrl,studentFormData).then((response)=>{
                setStudentData({
                    'full_name':'',
                    'email':'',
                    'username':'',
                    'password':'',
                    'interest':'',
                    'status':'success'
                });
                if(response.status===200){
                    Swal.fire({
                        title : 'Registration Successfull',
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
            }); 
        }
        catch(error){
            console.log(error);
            setStudentData({'status':'error'});
        }
    }  
    else{
        Swal.fire({
            title : 'Password Validation Failed',
            icon : 'error',
            toast : true,
            timer : 2000,
            position : 'top-right',
            timerProgressBar : true,
            showConfirmButton : false
        });
    } }
    else{
        Swal.fire({
            title : 'Fields Should not be Empty',
            icon : 'error',
            toast : true,
            timer : 2000,
            position : 'top-right',
            timerProgressBar : true,
            showConfirmButton : false
        });
    }
    };
    function validate(value){
        document.getElementById('val').style.color = "Red";
        if(value.length >=8){
            document.getElementById('val').style.color = "Green";
            return true;
        }
        return false;
    }

    function chk_empty(name,email,uname,pass,interest){
        console.log(name,email,uname,pass,interest);
        if(name.length <1 || email.length <1 || uname.length <1 || pass.length <1 || interest.length <1){
            return false;
        }
        return true;
    };

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-6 offset-3">
            {studentData.status === 'success' && <p className="text-success">Thank You for Registration!!!!</p>}
                {studentData.status === 'error' && <p className="text-success">Something Went Wrong</p>}
            <div className="card">
                <h5 className="card-header">User Register</h5>
                <div className="card-body">
                    <div className="mb-3">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input type="text" value={studentData.full_name} onChange={handleChange} name="full_name" id="fname" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input type="email" value={studentData.email} onChange={handleChange} name="email" id="uemail" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uname" className="form-label">Username</label>
                            <input type="text" value={studentData.username} onChange={handleChange} name="username" id="uname" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="upass" className="form-label">Password</label>
                            <input type="password" value={studentData.password} onChange={handleChange} name="password" id="upass" className="form-control"/>
                            <p id="val" className="PassCheck">Password Must Be 8 Char Long</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="interest" className="form-label">Interests</label>
                            <textarea  id="interest" value={studentData.interest} onChange={handleChange} name="interest" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div> 
                       
                        <button type="submit" id="Register" onClick={SubmitForm} className="btn btn-primary" >Register</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
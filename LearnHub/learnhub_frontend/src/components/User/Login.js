import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useEffect,useState } from "react";
const baseUrl = 'http://127.0.0.1:8000/api';

function Login(){
    const [studentLoginData,setStudentLoginData] = useState({
        email : '',
        password : '',
    });
    const [errorMsg,setErrorMsg] = useState('');

    const handleChange = (event) =>{
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        }
        );
    }

    const submitForm = () =>{
        const studentFormData = new FormData();
        studentFormData.append('email',studentLoginData.email);
        studentFormData.append('password',studentLoginData.password);
        if(chk_empty(studentLoginData.email,studentLoginData.password)){
        try{
            axios.post(baseUrl+'/student-login', studentFormData).then((res)=>{
                if(res.data.bool === true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    localStorage.setItem('studentName',res.data.name);
                    localStorage.setItem('studentImage',res.data.profile_image);
                    window.location.href = '/user-dashboard';
                    
                }
                else{
                    setErrorMsg('Invalid Email or Password!!!')
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }
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
    }

    const studentLogin_Status = localStorage.getItem('studentLoginStatus');
    if(studentLogin_Status === 'true'){
        window.location.href = '/user-dashboard';
    }
    useEffect(() =>{
        document.title = "Student Login";
    }
    );

    function chk_empty(email,pass){
        if(email.length <1 ||  pass.length <1){
            return false;
        }
        return true;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Student Login</h5>
                    <div className="card-body">
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="uemail" className="form-label">Email</label>
                                <input type="email" name="email" value={studentLoginData.email} onChange={handleChange} id="uemail" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="upass" className="form-label">Password</label>
                                <input type="password" value={studentLoginData.password} onChange={handleChange} name='password' id="upass" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button><Link to="/forgot" className='float-end me-3'>Forgot Passwprd ?</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
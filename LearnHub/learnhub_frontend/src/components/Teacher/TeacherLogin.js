import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useEffect,useState } from "react";
const baseUrl = 'http://127.0.0.1:8000/api';


function TeacherLogin(){

    const [teacherLoginData,setTeacherLoginData] = useState({
        email : '',
        password : '',
    });
    const handleChange = (event) =>{
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        }
        );
    }
    const [errorMsg,setErrorMsg] = useState('');

    const submitForm = () =>{
        const teacherFormData = new FormData();
        teacherFormData.append('email',teacherLoginData.email);
        teacherFormData.append('password',teacherLoginData.password);
        if(chk_empty(teacherLoginData.email,teacherLoginData.password)){
        try{
            axios.post(baseUrl+'/teacher-login', teacherFormData).then((res)=>{
                if(res.data.bool === true){
                    //console.log("ye nhi hua execute")
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',res.data.teacher_id);
                    localStorage.setItem('teacherName',res.data.name);
                    window.location.href = '/teacher-dashboard';
                    //console.log(localStorage.getItem('teacherLoginStatus'));
                    
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

    const teacherLogin_Status = localStorage.getItem('teacherLoginStatus');
    if(teacherLogin_Status === 'true'){
        window.location.href = '/teacher-dashboard';
    }
    useEffect(() =>{
        document.title = "Teacher Login";
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
                    <h5 className="card-header">Teacher Login</h5>
                    <div className="card-body">
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="uemail" className="form-label">Email</label>
                                <input type="email" name="email" value={teacherLoginData.email} onChange={handleChange} id="uemail" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="upass" className="form-label">Password</label>
                                <input type="password" value={teacherLoginData.password} onChange={handleChange} name='password' id="upass" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button><Link to="/teacher-forgot" className='float-end me-3'>Forgot Passwprd ?</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;
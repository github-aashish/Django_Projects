//import {Link} from 'react-router-dom';
import axios from 'axios';
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

        try{
            axios.post(baseUrl+'/student-login', studentFormData).then((res)=>{
                //console.log(res.data);
                if(res.data.bool === true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    localStorage.setItem('studentName',res.data.name);
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

    const studentLogin_Status = localStorage.getItem('studentLoginStatus');
    if(studentLogin_Status === 'true'){
        window.location.href = '/user-dashboard';
    }
    useEffect(() =>{
        document.title = "Student Login";
    }
    );

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
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
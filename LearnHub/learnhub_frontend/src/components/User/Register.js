import axios from 'axios';
import {useEffect,useState } from "react";
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
        studentFormData.append("interested_categories", studentData.skills);
        try{
            axios.post(baseUrl,studentFormData).then((response)=>{
                setStudentData({
                    'full_name':'',
                    'email':'',
                    'username':'',
                    'password':'',
                    'interest':'',
                    'status':'success'
                })
            });

            
        }
        catch(error){
            console.log(error);
            setStudentData({'status':'error'});
        }
        
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
                            <input type="text" value={studentData.full_name} onChange={handleChange} name="full_name" id="fname" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input type="email" value={studentData.email} onChange={handleChange} name="email" id="uemail" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uname" className="form-label">Username</label>
                            <input type="text" value={studentData.username} onChange={handleChange} name="username" id="uname" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="upass" className="form-label">Password</label>
                            <input type="text" value={studentData.password} onChange={handleChange} name="password" id="upass" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="interest" className="form-label">Interests</label>
                            <textarea  id="interest" value={studentData.interest} onChange={handleChange} name="interest" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div>
                        <button type="submit" onClick={SubmitForm} className="btn btn-primary">Register</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
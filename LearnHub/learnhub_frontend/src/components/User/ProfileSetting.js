//import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function ProfileSetting(){

    const studentId = localStorage.getItem('studentId')
    const [studentData,setStudentData] = useState({
        'full_name':'',
        'username':'',
        'email':'',
        'interested_categories':'',
        'prev_profileimage':'',
        'profile_image': '',
        'status':''
    });

    const handleChange = (event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value 
        });
    };
    const handleFileChange = (event) =>{
        setStudentData({
            ...studentData,[event.target.name]:event.target.files[0]
        });
    };
    
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus !== 'true'){
        window.location.href = '/user-login';
    };

//fetch Current Teacher Data
    useEffect (()=>{
        document.title = "Profile Setting";
        try{
            axios.get(baseUrl+'/student/'+studentId).then((res)=>{
                console.log("Hello Profiles");
                console.log(res.data.profile_image);
                setStudentData({
                    full_name : res.data.full_name,
                    username : res.data.username,
                    email : res.data.email,
                    interested_categories: res.data.interested_categories,
                    prev_profileimage:res.data.profile_image,
                    profile_image:''
                });
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const SubmitForm = ()=>{
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("username", studentData.username);
        studentFormData.append("email", studentData.email);
        studentFormData.append("interested_categories", studentData.interested_categories);
        if(studentData.profile_image!==''){
            studentFormData.append('profile_image', studentData.profile_image,studentData.profile_image.name);
        }
        try{
            axios.put(baseUrl+'/student/'+studentId +'/',studentFormData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                if(res.status===200){
                    Swal.fire({
                        title : 'Profile has been Updated',
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
        
    };


    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <Sidebar />
</aside>
<section className="col-md-9">
    <div className="card">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                    {/* <form> */}
                    <div className="mb-3 row">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input value={studentData.full_name} onChange={handleChange} type="text" name="full_name" id="fname" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="uname" className="form-label">User Name</label>
                            <input value={studentData.username} onChange={handleChange} type="text" name="full_name" id="uname" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input value={studentData.email} onChange={handleChange} type="email" name="email" id="email" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                        <label htmlFor="image" className="form-label">Profile Image</label>
                            <input type="file"  id="image" onChange={handleFileChange} name="profile_image" className="form-control"/>
                            <div id="emailHelp" className="form-text"><span className='badge bg-danger text-dark  me-1'>Note</span>Upload 300px X 300px Size Image</div>
                                {studentData.prev_profileimage && 
                                    <p className="mt-2 text-center"><img src={studentData.prev_profileimage} width="300" alt={studentData.full_name}/></p>
                                }
                            </div>
                        <div className="mb-3 row">
                            <label htmlFor="qualification" className="form-label">Interested Categories</label>
                            <input value={studentData.interested_categories} onChange={handleChange} type="text" name="interested_categories" id="qualification" className="form-control" />
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div>
                        <button onClick={SubmitForm} type="submit" className="btn btn-primary">Update</button>
                    {/*</form>*/}
                </div>
            </div>
    
</section>
            </div>
        </div>
    );
}

export default ProfileSetting;
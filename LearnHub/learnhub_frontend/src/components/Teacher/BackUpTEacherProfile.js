//import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect } from "react";
//import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';


function TeacherProfileSetting(){

    const teacherId = localStorage.getItem('teacherId')
    const [teacherData,setTeacherData] = useState({
        'full_name':'',
        'email':'',
        'mobile':'',
        'qualification':'',
        'skills':'',
        'detail':'',
        'prev_profileimage':'',
        'profile_image': '',
        'status':''
    });

    const handleChange = (event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value   
        });
    };
    const handleFileChange = (event) =>{
        setTeacherData({
            ...teacherData,[event.target.name]:event.target.files[0]
        });
    };
    
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus !== 'true'){
        window.location.href = '/teacher-login';
    };

//fetch Current Teacher Data
    useEffect (()=>{
        document.title = "Profile Setting";
        try{
            axios.get(baseUrl+'/teacher/'+teacherId).then((res)=>{
                setTeacherData({
                    full_name : res.data.full_name,
                    email : res.data.email,
                    mobile : res.data.mobile,
                    qualification: res.data.qualification,
                    skills:res.data.skills ,
                    detail:res.data.detail,
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

        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile", teacherData.mobile);
        teacherFormData.append("skills", teacherData.skills);
        teacherFormData.append("detail", teacherData.detail);
        if(teacherData.profile_image!==''){
            teacherFormData.append('profile_image', teacherData.profile_image,teacherData.profile_image.name);
        }
        try{
            axios.put(baseUrl+'/teacher/'+teacherId +'/',teacherFormData,{
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
            setTeacherData({'status':'error'});
        }
    
        
    };
    


    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar />
</aside>
<section className="col-md-9">
<div className="card">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                    {/* <form> */}
                    <div className="mb-3 row">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input value={teacherData.full_name} onChange={handleChange} type="text" name="full_name" id="fname" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input value={teacherData.email} onChange={handleChange} type="email" name="email" id="uemail" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="contact" className="form-label">Contact Number</label>
                            <input value={teacherData.mobile} onChange={handleChange} type="number" name="mobile" id="contact" className="form-control" />
                        </div>
                        <div className="mb-3 row">
                        <label htmlFor="image" className="form-label">Profile Image</label>
                            <input type="file"  id="image" onChange={handleFileChange} name="profile_image" className="form-control"/>
                            <div id="emailHelp" className="form-text"><span className='badge bg-danger text-dark  me-1'>Note</span>Upload 300px X 300px Size Image</div>
                                {teacherData.prev_profileimage && 
                                    <p className="mt-2 text-center"><img src={teacherData.prev_profileimage} width="300" alt={teacherData.full_name}/></p>
                                }
                            </div>
                        <div className="mb-3 row">
                            <label htmlFor="qualification" className="form-label">Qualification</label>
                            <input value={teacherData.qualification} onChange={handleChange} type="text" name="qualification" id="qualification" className="form-control" />
                            <div id="emailHelp" className="form-text">BCA | MCA | BA | Btech | etc..</div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <textarea value={teacherData.skills} onChange={handleChange}  id="skills" name="skills" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="detail" className="form-label">Details</label>
                            <textarea value={teacherData.detail} onChange={handleChange}  id="detail" name="detail" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">You Achievements, Your Degrees etc...</div>
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

export default TeacherProfileSetting;

import axios from 'axios';
import { useEffect,useState } from "react";
import './validation.css'
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api/teacher/';



function TeacherRegister(){
    const [teacherData,setTeacherData] = useState({
        'full_name':'',
        'email':'',
        'mobile':'',
        'password':'',
        'qualification':'',
        'skills':'',
        'status':''
    });

    //Change Element Value
    const handleChange = (event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value   
        });
    }

    //Submit Form
    const SubmitForm = ()=>{
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("password", teacherData.password);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile", teacherData.mobile);
        teacherFormData.append("skills", teacherData.skills);
        if(chk_empty(teacherData.full_name,teacherData.email,teacherData.password,teacherData.qualification,teacherData.mobile,teacherData.skills)){
            if(chk_mobile(teacherData.mobile)){
            if(validate(teacherData.password)){
        try{
            axios.post(baseUrl,teacherFormData).then((response)=>{
                setTeacherData({
                    'full_name':'',
                    'email':'',
                    'mobile':'',
                    'password':'',
                    'qualification':'',
                    'skills':'',
                    'status':'success'
                })
            });

            
        }
        catch(error){
            console.log(error);
            setTeacherData({'status':'error'});
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
    }}
else{
    Swal.fire({
        title : 'Invalid Mobile Number',
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
    //End 

    useEffect(() =>{
        document.title = "Teacher Register";
    }
    );

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus === 'true'){
        window.location.href = '/teacher-dashboard';
    };

    function chk_mobile(mobile_no){
        if(mobile_no.length === 10){
            if (mobile_no[0] === '6' || mobile_no[0] === '7' || mobile_no[0] === '8' || mobile_no[0] === '9'){
                return true;
            }
            return false;
        }
        return false;
    }
    function validate(value){
        document.getElementById('val').style.color = "Red";
        if(value.length >=8){
            document.getElementById('val').style.color = "Green";
            return true;
        }
        return false;
    }

    function chk_empty(name,email,pass,qualification,mobile,skills){
        if(name.length <1 || email.length <1 || pass.length <1 || qualification.length <1 || mobile.length <1 || skills.length <1){
            return false;
        }
        return true;
    };


    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-6 offset-3">
                {teacherData.status === 'success' && <p className="text-success">Registration Done Successfully</p>}
                {teacherData.status === 'error' && <p className="text-success">Something Went Wrong</p>}
            <div className="card">
                <h5 className="card-header">Teacher Register</h5>
                <div className="card-body">
                    {/* <form> */}
                    <div className="mb-3">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input value={teacherData.full_name} onChange={handleChange} type="text" name="full_name" id="fname" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input value={teacherData.email} onChange={handleChange} type="email" name="email" id="uemail" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Contact Number</label>
                            <input value={teacherData.mobile} onChange={handleChange} type="number" name="mobile"  id="contact" className="form-control" />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="upass" className="form-label">Password</label>
                            <input value={teacherData.password} onChange={handleChange} type="password" name="password" id="upass" className="form-control" />
                            <p id="val" className="PassCheck">Password Must Be 8 Char Long</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qualification" className="form-label">Qualification</label>
                            <input value={teacherData.qualification} onChange={handleChange} type="text" name="qualification" id="qualification" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <textarea value={teacherData.skills} onChange={handleChange}  id="skills" name="skills" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div>
                        <button onClick={SubmitForm} type="submit" className="btn btn-primary">Register</button>
                    {/*</form>*/}
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default TeacherRegister;
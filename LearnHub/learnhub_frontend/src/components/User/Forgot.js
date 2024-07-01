//import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useEffect,useState } from "react";
const baseUrl = 'http://127.0.0.1:8000/api';

function Forgot(){
    const [studentForgotData,setstudentForgotData] = useState({
        email : '',
    });
    //const [errorMsg,setErrorMsg] = useState('');

    const handleChange = (event) =>{
        setstudentForgotData({
            ...studentForgotData,
            [event.target.name]:event.target.value
        }
        );
    }

    const submitForm = () =>{
        const studentFormData = new FormData();
        studentFormData.append('email',studentForgotData.email);
        if(chk_empty(studentForgotData.email)){
        try{
            axios.post(baseUrl+'/student-forgot-password', studentFormData).then((res)=>{
                if(res.data.bool === true){
                    Swal.fire({
                        title : 'Email Send Successfully',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setTimeout(() => {
                        window.location.href = '/user-login';
                    }, 2000);
                    
                }
                else{
                    Swal.fire({
                        title : 'Email is not Registered',
                        icon : 'error',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
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

    useEffect(() =>{
        document.title = "Forgot Password";
    }
    );

    function chk_empty(email){
        if(email.length <1){
            return false;
        }
        return true;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Forgot Password</h5>
                    <div className="card-body">
                {/*{errorMsg && <p className="text-danger">{errorMsg}</p>}*/}
                            <div className="mb-3">
                                <label htmlFor="uemail" className="form-label">Email</label>
                                <input type="email" name="email" value={studentForgotData.email} onChange={handleChange} id="uemail" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Send Email</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;
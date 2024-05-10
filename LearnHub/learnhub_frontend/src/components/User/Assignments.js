import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';


function Assignments(){
    const [assignmentData, setAssignmentData] = useState([]);

    const studentId = localStorage.getItem('studentId')

    //fetch students when page loads
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/my-assignment/'+studentId).then((res)=>{
                setAssignmentData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const markAsDone = (assignment_id,teacher,student,title,detail)=>{
        const _formData = new FormData();
        _formData.append('teacher', teacher);
        _formData.append('student', student);
        _formData.append('title', title);
        _formData.append('detail', detail);
        _formData.append('student_status', true);
        try{
            axios.put(baseUrl+'/update-assignment/'+assignment_id,_formData).then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : "Congrats You Completed Your Assignment | Don't Cheat",
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    };


    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <Sidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">My Assignments</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Teacher</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {assignmentData.map((row,index )=>
            <tr>
            <td>{row.title}</td>
            <td>{row.detail}</td>
            <td><Link to={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link></td>
            <td>
                {row.student_status === false && <button onClick={()=>markAsDone(row.id,row.teacher.id,row.student.id,row.title,row.detail)} className='btn btn-sm btn-danger'>Mark as Done</button>}
                {row.student_status === true && <span className='badge bg-primary '>Completed</span>}

            </td>
            </tr>
            )}
        </tbody>
            </table>
        </div>
    </div>
</section>
            </div>
        </div>
    );

}

export default Assignments;
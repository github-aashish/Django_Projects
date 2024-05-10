import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function ShowAssignment(){

    const [assignmentData, setAssignmentData] = useState([]);
    const [totalAssignment, settotalAssignment] = useState(0);

    const {teacher_id} = useParams();
    const {student_id} = useParams();
    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id).then((res)=>{
                settotalAssignment(res.data.length);
                setAssignmentData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    

    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">All Asignments ({totalAssignment}) <Link className='btn btn-success btn-sm float-end' to={`/add-assignment/${student_id}/${teacher_id}`}>Add Assignment</Link></h5>
        <div className="card-body">
        <table className="table table-bordered">
        <thead>
            <tr>
                <th>Title</th>
                <th>Detail</th>
                <th>Student Status</th>
            </tr>
        </thead>
        <tbody>
            {assignmentData.map((assignment,index )=>
            <tr>
            <td>{assignment.title}</td>
            <td>{assignment.detail}</td>
            <td>
                {assignment.student_status === false && <span className='badge bg-warning text-black'>pending....</span>}
                {assignment.student_status === true && <span className='badge bg-success'>completed</span>}
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

export default ShowAssignment;
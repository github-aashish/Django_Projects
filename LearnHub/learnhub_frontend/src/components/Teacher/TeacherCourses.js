import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';


function TeacherCourses(){

    const [courseData, setCourseData] = useState([]);
    

    //console.log(teacherId)

    //Fetch Coursers when page load
    useEffect (()=>{
        const teacherId = localStorage.getItem('teacherId')
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/teacher-course/'+teacherId).then((res)=>{
                //console.log(res.data);
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);
    //console.log(courseData);

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">My Courses</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Total Enrolled</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {courseData.map((course,index )=>
            <tr>
            <td><Link to={`/all-modules/` + course.id}>{course.title}</Link>
            <hr/>
            {course.course_rating && <span>Rating: {course.course_rating}/5</span>}
            {!course.course_rating && <span>Rating: 0/5</span>}

            </td>
            <td><img src={course.featured_image} width="80" alt={course.title} className='rounded' /></td>
            <td><Link to={`/enrolled-students/` + course.id}>{course.total_enrolled_students}</Link></td>
            <td>
            <Link to={`/edit-course/` + course.id} className='btn btn-info btn-sm '>Edit</Link>
                <Link to={`/add-modules/` + course.id} className='btn btn-success btn-sm ms-2'>Add Module</Link>
                <Link to={`/assign-quiz/` + course.id} className='btn btn-warning btn-sm ms-2'>Assign Quiz</Link>
                <button className='btn btn-sm btn-danger ms-2'>Delete</button>
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

export default TeacherCourses;
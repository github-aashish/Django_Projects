import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function AllCourses(){

    const [courseData, setCourseData] = useState([]);

    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "All Courses";
        try{
            axios.get(baseUrl+'/course/').then((res)=>{
                //console.log(res.data);
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-3">
        <h3 className="pb-1 mb-4">Latest Courses</h3>
            <div className="row mb-4">

            {courseData && courseData.map((course,index)=>
            <div className="col-md-3 mb-4 mb-4">
            <div className="card">
            <Link to={`/detail/${course.id}`}><img src={course.featured_image} className="card-img-top" alt={course.title}/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                {/* <h5 className="card-title"><Link to="#">{course.teacher}</Link></h5>*/}
            </div>
            </div>
            </div>
        )}
        
            </div>

            {/* Pagination Start*/}
                <nav aria-label="Page navigation example mt-5">
                    <ul className="pagination justify-content-center pagination-lg">
                        <li className="page-item"><a href="/" className="page-link">Previos</a></li>
                        <li className="page-item"><a href="/" className="page-link">1</a></li>
                        <li className="page-item"><a href="/" className="page-link">2</a></li>
                        <li className="page-item"><a href="/" className="page-link">3</a></li>
                        <li className="page-item"><a href="/" className="page-link">Next</a></li>
                    </ul>
                </nav>
            {/* Pagination End*/}
            
            </div>
    );
}

export default AllCourses;
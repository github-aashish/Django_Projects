import {Link,useParams} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from 'axios';
const SiteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';


function CourseDetail(){
    const {course_id} = useParams();
    const [courseData, setCourseData] = useState([]);
    const [moduleData, setModuleData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [technologyListData, setTechnologyListData] = useState([]);


    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/course/'+course_id).then((res)=>{
                setCourseData(res.data);
                setModuleData(res.data.course_modules);
                setTeacherData(res.data.teacher);
                setRelatedCourseData(JSON.parse(res.data.related_videos));
                setTechnologyListData(res.data.technologies_list);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4"><img src={courseData.featured_image} className="card-img-top" alt={courseData.title}/></div>
                <div className="col-8"><h3>{courseData.title}</h3>
                <p>{courseData.description}</p>
                <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                <p className="fw-bold">Techs:&nbsp;
                {technologyListData.map((tech,index)=>
                <Link to={`/category/${tech.trim()}`} className='badge bg-pill text-dark bg-warning'>{tech.trim()}</Link>)}
                </p>
                <p className="fw-bold">Duration: 3 Hours 30 minutes</p>
                <p className="fw-bold">Total Enrolled: 456 studenrs</p>
                <p className="fw-bold">Rating: 4/5</p>
            </div>
            </div>
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Modules
                </h5>
                <ul className="list-group list-group-flush">
                    {moduleData.map((module,index)=>
                    <li className="list-group-item">{module.title} 
                    <span className='float-end'>
                        <span className="me-5">1 Hour 30 Minutes</span><button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button></span>
                        {/*Video Modal Start*/}
                        {/* modal-xl  for extra large*/ }
                        <div className="modal fade modal-lg" id="videoModal1" tabIndex="-1" aria-labelledby='exampleModalLabel' aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{module.title}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="ratio ratio-16x9">
                                            <iframe src={module.video} title={module.title} allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Video Modal End*/}
                        </li>
                    )}
                </ul>
            </div>
            <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
            <div className="row mb-4">
            {relatedCourseData.map((rcourse,index)=>
            <div className="col-md-3">
            <div className="card">
            <Link target="__blank" to={`/detail/${rcourse.pk}`}><img src={`${SiteUrl}media/${rcourse.fields.featured_image}`} className="card-img-top" alt={rcourse.fields.title}/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
            </div>
            </div>
            </div>
            )}
            </div>
        </div>
    );
}

export default CourseDetail;
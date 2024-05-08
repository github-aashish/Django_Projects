import {Link,useParams} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';


function TeacherDetail(){

    const [courseData, setCourseData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [skillListData, setSkillListData] = useState([]);

    const {teacher_id} = useParams();

    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/teacher/'+teacher_id).then((res)=>{
                setTeacherData(res.data);
                setCourseData(res.data.teacher_courses);
                setSkillListData(res.data.skill_list);

            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (<div className="container mt-3">
    <div className="row">
        <div className="col-4"><img src="/mteacher.avif" className="card-img-top" alt="Teacher"/></div>
        <div className="col-8"><h3>{teacherData.full_name}</h3>
        <p>{teacherData.detail}</p>
        <p className="fw-bold">Skills:&nbsp;
        {skillListData.map((skill,index)=>
        <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className='badge bg-pill text-dark bg-warning me-2'>{skill.trim()}
        </Link>)}</p>
        <p className="fw-bold">Recent Course: <Link to="/teacher-detail/1">Php</Link></p>
        <p className="fw-bold">Rating: 4/5</p>
    </div>
    </div>
    <div className="card mt-4">
        <h5 className="card-header">
            Course List
        </h5>
        <div className="list-group list-group-flush">
            {courseData.map((course,index)=>
            <Link to={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
        )}
        </div>
    </div>
</div>);
}

export default TeacherDetail;
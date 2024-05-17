import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function Home(){

    const [courseData, setCourseData] = useState([]);
    const [popularData, setpopularData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);


    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "LearnHub | Home";
        try{
            axios.get(baseUrl+'/course/?result=4').then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/popular/?result-popular=4').then((res)=>{
                setpopularData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/popular-teacher/?result=4').then((res)=>{
                setTeacherData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-4">
            {/* latest Courses */}
            <h3 className="pb-1 mb-4">Latest Courses <Link to="/all-courses" className="float-end">See All</Link></h3>
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
            {/* End of latest Courses */}
            {/* Popular Courses */}
            <h3 className="pb-1 mb-4 mt-5">Popular Courses <Link to="/popular-courses" className="float-end">See All</Link></h3>
            <div className="row mb-4">

        {popularData && popularData.map((course,index)=>
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
            {/* End of popular Courses */}
            {/*Popular teachers */}
            <h3 className="pb-1 mb-4 mt-5">Popular Teachers <Link to="/popular-teachers" className="float-end">See All</Link></h3>
            <div className="row mb-4">
            {teacherData && teacherData.map((teacher,index)=>
            <div className="col-md-3 mb-4 mb-4">
            <div className="card">
            <Link to={`/detail/${teacher.id}`}><img src={teacher.profile_image} className="card-img-top" alt={teacher.full_name}/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
                {/* <h5 className="card-title"><Link to="#">{course.teacher}</Link></h5>*/}
            </div>
            </div>
            </div>
        )}
            </div>
            {/*End of popular teachers */}
            {/* Student testimonials */}
            <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
            <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <figure className="text-center">
        <blockquote className="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </figure>
    </div>
    <div className="carousel-item">
    <figure className="text-center">
        <blockquote className="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </figure>
    </div>
    <div className="carousel-item">
    <figure className="text-center">
        <blockquote className="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </figure>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
            {/* End of Student testimonials */}
        </div>
    );
}

export default Home
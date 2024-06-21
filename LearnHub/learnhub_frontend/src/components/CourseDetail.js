import {Link,useParams} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
const SiteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';


function CourseDetail(){
    const {course_id} = useParams();
    
    const [courseData, setCourseData] = useState([]);
    const [moduleData, setModuleData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [userLoginStatus,setUserLoginStatus] = useState();
    const [userRatingStatus,setUserRatingStatus] = useState();
    const [userEnrollStatus,setUserEnrollStatus] = useState();
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [technologyListData, setTechnologyListData] = useState([]);
    const [avgRatingData, setAvgRatingData] = useState(0);
    const [favouriteStatus,setFavouriteStatus] = useState();

    const studentId= localStorage.getItem('studentId');
    


    const [ratingData, setRatingData] = useState({
        rating : '',
        review : '',
}
);

const handleChange =(event)=>{
    setRatingData({
        ...ratingData,[event.target.name]:event.target.value
    });
};


    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/course/'+course_id).then((res)=>{
                setCourseData(res.data);
                setModuleData(res.data.course_modules);
                setTeacherData(res.data.teacher);
                setRelatedCourseData(JSON.parse(res.data.related_videos));
                setTechnologyListData(res.data.technologies_list);
                if(res.data.course_rating!== '' && res.data.course_rating!== null){
                    setAvgRatingData(res.data.course_rating);
                }
            });
        }
        catch(error){
            console.log(error);
        }
        const studentLogin_Status = localStorage.getItem('studentLoginStatus');
        console.log("Student Status:"+studentLogin_Status)
        if(studentLogin_Status === 'true'){
            setUserLoginStatus('success');
        }
        
if(studentLogin_Status === 'true'){
    
try{
    axios.get(baseUrl+'/fetch-rating-status/'+studentId+'/'+course_id)
    .then((res)=>{
        if(res.data.bool===true){
            setUserRatingStatus('success');
        }
    });
}
catch(error){
    console.log(error);
}

//Fetch Favourite Status
try{
    axios.get(baseUrl+'/fetch-favourite-status/'+studentId+'/'+course_id)
    .then((res)=>{
        console.log("Response Data:"+res)
        if(res.data.bool===true){
            setFavouriteStatus('success');
        }
        else{
            setFavouriteStatus('');
        }
    });
}
catch(error){
    console.log(error);
}
//Fetch Enroll Status
try{
    axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
    .then((res)=>{
        if(res.data.bool===true){
            setUserEnrollStatus('success');
        }
    });
}
catch(error){
    console.log(error);
}
}
    },[]);

    const enrollCourse = ()=>{
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        try{
            axios.post(baseUrl+'/student-enroll-course/',_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : 'You have been Successfully Enrolled in this Course!!',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setUserEnrollStatus('success');
                }
                setTimeout(()=>{
                    window.location.reload();
                },2000);
                })
            }
        catch(error){
            console.log(error);
            setCourseData({'status':'error'});
        }
    };


    const markAsFavourite = ()=>{
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',true);
        try{
            axios.post(baseUrl+'/student-add-favourite-course/',_formData,{
                header :{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : 'Course Marked As Favourite Courses',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setFavouriteStatus('success');
                }
            })
        }
        catch(error){

        }
    };

    const removeFavourite =(pk)=>{
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',false);
        try{
            axios.get(baseUrl+'/student-remove-favourite-course/'+course_id+'/'+studentId,{
                header :{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : 'Course Removed from Favourite Courses',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setFavouriteStatus('');
                }
            })
        }
        catch(error){

        }
    }


    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('rating', ratingData.rating);
        _formData.append('review', ratingData.review);
        try{
            axios.post(baseUrl+'/course-rating/'+course_id,_formData)
            .then((res)=>{
                if(res.status===200 || res.status===201){
                    Swal.fire({
                        title : 'Rating Added Successfully!!!',
                        icon : 'success',
                        toast : true,
                        timer : 2000,
                        position : 'top-right',
                        timerProgressBar : true,
                        showConfirmButton : false
                    });
                    setTimeout(()=>{
                        window.location.reload();
                    },3000);
                }
                })
            }
        catch(error){
            console.log(error);
            setModuleData({'status':'error'});
        }

    };

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
                <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} student(s)</p>
                <p className="fw-bold">Rating: {avgRatingData}/5
                {userEnrollStatus === 'success' && userLoginStatus === 'success' &&
                <>
                {userRatingStatus !== 'success' && 
                <button className='btn btn-sm btn-success ms-2' data-bs-toggle="modal" data-bs-target="#ratingModal">Give Rating</button>
                }
                {userRatingStatus ==='success' && 
                <small className='badge bg-info text-dark ms-2'>You Review has already stored!!</small>
                }
                <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Rating for {courseData.title}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    {/* <form>*/}
                        <div className="mb-3">
                            <label for="rating" className="form-label">Rating</label>
                            <select onChange={handleChange} id="rating" className="form-control" name="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="review" className="form-label">Review</label>
                            <textarea onChange={handleChange} id="review" className='form-control' name="review" rows="5"></textarea>
                        </div>
                        <button type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        {/* </form>*/}
                    </div>
                    <div className="modal-footer">
                      <button type="button"  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              </>
                
                }
                
                </p>
                {userEnrollStatus === 'success' && userLoginStatus === 'success' && <p><span>You are already enrolled in this Course</span></p>}

                {userLoginStatus === 'success' && userEnrollStatus !== 'success' && <p><button type='button' className='btn btn-success' onClick={enrollCourse}>Enroll in this Course</button></p>}

                {userLoginStatus === 'success' && favouriteStatus!=='success' && <p><button type='button' title='Add to Favourites' className='btn btn-outline-danger' onClick={markAsFavourite}><i className='bi bi-heart-fill'></i></button></p>}

                {userLoginStatus === 'success' && favouriteStatus ==='success' && <p><button type='button' title='Remove from Favourites' className='btn btn-danger' onClick={removeFavourite}><i className='bi bi-heart-fill'></i></button></p>}


                {userLoginStatus !=='success' && <p><Link to="/user-login">Login to Enroll !</Link></p>}
                
            </div>
            </div>

            {userEnrollStatus !== 'success' && userLoginStatus === 'success' &&
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Modules
                </h5>
            <div className="card-body">
                <p classname="card-text text-xl-left"><i className="bi bi-lock-fill"></i></p>
            <p classname="card-text"><button type='button' className='btn btn-success' onClick={enrollCourse}>Enroll to Unlock Modules</button></p>
  </div>
</div> }
{userLoginStatus !=='success' && <div className="card mt-4">
                <h5 className="card-header">
                    Course Modules
                </h5>
            <div className="card-body">
                <h1 className='text-center'><i className="bi bi-lock-fill"></i></h1>
            <p classname="card-text"><Link to="/user-login" className="btn btn-primary">Login and Enroll To Unlock Modules !</Link></p>
  </div>
</div>}


            {userEnrollStatus === 'success' && userLoginStatus === 'success' &&
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Modules
                </h5>
                <ul className="list-group list-group-flush">
                    
                    {moduleData.map((module,index)=>
                    <li className="list-group-item">{module.title} 
                    <span className='float-end'>
                        <span className="me-5"></span><button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button></span>
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
                                            {/* <iframe src={module.video} title={module.title} allowFullScreen></iframe>*/}
                                            <video controls width="250">
                                                <source src={module.video} type="video/mp4" />
                                                Sorry Your Browser Doesn't Support Embeddeb Videos!!!
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Video Modal End*/}
                        </li>
                    )}
                </ul>
            </div>}

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
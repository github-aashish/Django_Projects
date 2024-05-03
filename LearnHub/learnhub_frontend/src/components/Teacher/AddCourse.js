import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function AddCourse(){
    const [cats,setCats] = useState([]);
    const [courseData, setCourseData] = useState({
            category : '',
            title : '',
            description : '',
            featured_image: '',
            technologies : ''
    }
    );

    useEffect (()=>{
        document.title = "Add Course";
        try{
            axios.get(baseUrl+'/category').then((res)=>{
                //console.log(res.data);
                setCats(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const handleChange =(event)=>{
        setCourseData({
            ...courseData,[event.target.name]:event.target.value
        });
    };

    const handleFileChange = (event) =>{
        setCourseData({
            ...courseData,[event.target.name]:event.target.files[0]
        });
    };

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 34);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_image', courseData.featured_image,courseData.featured_image.name);
        _formData.append('technologies', courseData.technologies);
        try{
            axios.post(baseUrl+'/course/',_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                console.log(res.data);
                })
            }
        catch(error){
            console.log(error);
            setCourseData({'status':'error'});
        }

    };

    //console.log(cats);

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Add Courses</h5>
        <div className="card-body">
            <div className="mb-3">
        <label htmlFor="categoryies" className="form-label">Category</label>
            <select name="category" onChange={handleChange} id="categoryies" className="form-control">
            {cats.map((category,index)=>{return <option key={category.id} value={category.id}>{category.title}</option>})}
            </select>
    </div>
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={handleChange} name="title" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea className="form-control" onChange={handleChange} name="description" id="desc"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="image" className="form-label">Featured Image</label>
            <input type="file" id="image" onChange={handleFileChange} name="featured_image" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="interest" className="form-label">Technologies</label>
            <textarea className="form-control" onChange={handleChange} name="technologies" placeholder="Php, Java, Python, etc.." id="interest"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default AddCourse;
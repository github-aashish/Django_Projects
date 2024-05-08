import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function AddModules(){
    const [moduleData, setModuleData] = useState({
            title : '',
            description : '',
            video: '',
            remarks : ''
    }
    );

    useEffect (()=>{
        document.title = "Add Module";})

    const handleChange =(event)=>{
        setModuleData({
            ...moduleData,[event.target.name]:event.target.value
        });
    };

    const handleFileChange = (event) =>{
        setModuleData({
            ...moduleData,[event.target.name]:event.target.files[0]
        });
    };

    const {course_id} = useParams();

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('title', moduleData.title);
        _formData.append('description', moduleData.description);
        _formData.append('video', moduleData.video,moduleData.video.name);
        _formData.append('remarks', moduleData.remarks);
        try{
            axios.post(baseUrl+'/module/',_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            }).then((res)=>{
                //console.log(res.data);
                window.location.href = '/add-modules/4'
                })
            }
        catch(error){
            console.log(error);
            setModuleData({'status':'error'});
        }

    };

    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Add modules</h5>
        <div className="card-body">
           {/* <form>*/} 
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={handleChange} name="title" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea name="description" onChange={handleChange} className="form-control" id="desc"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="video" className="form-label">Video</label>
            <input type="file" name="video" onChange={handleFileChange} id="video" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="interest" className="form-label">Remarks</label>
            <textarea className="form-control" onChange={handleChange} name="remarks" placeholder="This video is Focused on Basics...." id="interest"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
      {/*</form> */}
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default AddModules;
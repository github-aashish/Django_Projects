//import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function EditModule(){
    const [moduleData, setModuleData] = useState({
        course: '',
        title : '',
        description : '',
        previous_video:'',
        video: '',
        remarks : ''
}
);

const {module_id} = useParams();
//console.log("Here is the module id: " + module_id);


useEffect (()=>{
    try{
        axios.get(baseUrl+'/modules/'+module_id).then((res)=>{
            //console.log(res.data);
            setModuleData({
                course: res.data.course,
                title : res.data.title,
                description : res.data.description,
                previous_video:res.data.video,
                remarks : res.data.remarks,
                video: '',
            });
        });
    }
    catch(error){
        console.log(error);
    }
    document.title = "Edit Module";
},[]);

const handleChange =(event)=>{
    setModuleData({
        ...moduleData,[event.target.name]:event.target.value
    });
};

const handleFileChange = (event) =>{
    setModuleData({
        ...moduleData,
        [event.target.name]:event.target.files[0]
    });
};


const formSubmit = () =>{
    const _formData = new FormData();
    _formData.append('course', moduleData.course);
    _formData.append('title', moduleData.title);
    _formData.append('description', moduleData.description);
    if(moduleData.video!==''){
        _formData.append('video', moduleData.video,moduleData.video.name);
    }
    
    _formData.append('remarks', moduleData.remarks);
    try{
        axios.put(baseUrl+'/modules/'+module_id,_formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then((res)=>{
            if(res.status==200){
                Swal.fire({
                    title : 'Data has been Updated',
                    icon : 'success',
                    toast : true,
                    timer : 2000,
                    position : 'top-right',
                    timerProgressBar : true,
                    showConfirmButton : false
                });
            }
            setTimeout(()=>{//window.location.href = '/edit-module/'+module_id;
                window.location.reload();
            },2000);
            })
        }
    catch(error){
        console.log(error);
        setModuleData({'status':'error'});
    }

};


    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Edit modules</h5>
        <div className="card-body">
           {/* <form>*/} 
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={moduleData.title} onChange={handleChange} name="title" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea name="description" value={moduleData.description} onChange={handleChange} className="form-control" id="desc"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="video" className="form-label">Video</label>
            <input type="file" name="video" onChange={handleFileChange} id="video" className="form-control"/>
            {moduleData.previous_video && 
                <video controls width="100%" className='mt-2'>
                    <source src={moduleData.previous_video} type="video/webm" />
                    <source src={moduleData.previous_video} type="video/mp4" />
                    Sorry Your Browser Doesn't Support Embeddeb Videos!!!
                </video>
                }
    </div>
    <div className="mb-3">
        <label htmlFor="interest" className="form-label">Remarks</label>
            <textarea className="form-control" value={moduleData.remarks} onChange={handleChange} name="remarks" placeholder="This video is Focused on Basics...." id="interest"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary' onClick={formSubmit}>Update</button>
      {/*</form> */}
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default EditModule;
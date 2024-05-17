import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function AllModules(){

    const [moduleData, setModuleData] = useState([]);
    const [totalModule, settotalModule] = useState(0);

    const {course_id} = useParams();

    //Fetch Coursers when page load
    useEffect (()=>{
        document.title = "Courses";
        try{
            axios.get(baseUrl+'/course-modules/'+course_id).then((res)=>{
                //console.log(res.data);
                settotalModule(res.data.length);
                setModuleData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const Swal = require('sweetalert2');
    const handleDeleteClick = (module_id)=>{
            Swal.fire({
                title : 'Confirm!',
                text : 'Do you want to Delete this?',
                icon : 'info',
                confirmButtonText : 'Continue',
                showCancelButton : true
            }).then((result)=>{
                if(result.isConfirmed){
                    try{
                        axios.delete(baseUrl+'/modules/'+module_id).then((res)=>{
                            Swal.fire('success','Data has been deleted');
                            try{
                                axios.get(baseUrl+'/course-modules/'+course_id).then((res)=>{
                                    //console.log(res.data);
                                    settotalModule(res.data.length);
                                    setModuleData(res.data);
                                });
                            }
                            catch(error){
                                console.log(error);
                            }
                        });
                        
                    }
                    catch(error){
                        Swal.fire('error','Data has not been deleted!!!');
                    }
                }
                else{
                    Swal.fire('error','Data has not been deleted!!!');
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">All Modules ({totalModule}) <Link className='btn btn-success btn-sm float-end' to={`/add-modules/` + course_id}>Add Module</Link></h5>
        <div className="card-body">
        <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Video</th>
                <th>Remarks</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {moduleData.map((module,index )=>
            <tr>
            <td><Link to={`/edit-module`+module.id}>{module.title}</Link></td>
            <td>
                <video controls width="250">
                    <source src={module.video} type="video/webm" />
                    <source src={module.video} type="video/mp4" />
                    Sorry Your Browser Doesn't Support Embeddeb Videos!!!
                </video>
            </td>
            <td>{module.remarks}</td>
            <td>
                <Link to={`/edit-module/`+module.id} className='btn btn-info '><i className='bi bi-pencil-square'></i></Link>
                <button onClick={()=>handleDeleteClick(module.id)} className='btn btn-danger ms-1'><i className='bi bi-trash3'></i></button>
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

export default AllModules;
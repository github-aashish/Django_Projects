import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function PopularTeachers(){

    const [teacher, setTeacher] = useState(null);
    useEffect(()=>{
        axios.get(baseUrl+'/teacher/').then((response)=>{
            setTeacher(response.data);
        });
    },[]);
    console.log(teacher);

    return (
        <div className="container mt-3">
        <h3 className="pb-1 mb-4">Popular Teachers</h3>
            <div className="row mb-4">
            <div className="col-md-3 mb-4 mb-4">
            <div className="card">
            <Link to="/teacher-detail/1"><img src="logo512.png" className="card-img-top" alt="..."/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Detail</Link></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <a href="/"><img src="logo512.png" className="card-img-top" alt="..."/></a>
                <div className="card-body">
                <h5 className="card-title"><a href="/">Teacher Detail</a></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <a href="/"><img src="logo512.png" className="card-img-top" alt="..."/></a>
                <div className="card-body">
                <h5 className="card-title"><a href="/">Teacher Detail</a></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <a href="/"><img src="logo512.png" className="card-img-top" alt="..."/></a>
                <div className="card-body">
                <h5 className="card-title"><a href="/">Teacher Detail</a></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <Link to="/teacher-detail/1"><img src="logo512.png" className="card-img-top" alt="..."/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Detail</Link></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <Link to="/teacher-detail/1"><img src="logo512.png" className="card-img-top" alt="..."/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Detail</Link></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <Link to="/teacher-detail/1"><img src="logo512.png" className="card-img-top" alt="..."/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Detail</Link></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
            <div className="col-md-3 mb-4">
            <div className="card">
            <Link to="/teacher-detail/1"><img src="logo512.png" className="card-img-top" alt="..."/ ></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Detail</Link></h5>
            </div>
            <div className="card-footer">
                <div className="title">
                    <span>Rating : 4.5/5</span>
                    
                    </div> 
            </div>
            </div>
            </div>
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

export default PopularTeachers;
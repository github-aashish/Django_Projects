import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import './Teacher.css';


function TeacherCourses(){
    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">My Courses</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Total Enrolled</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <td>Python</td>
            <td><Link to="/">253</Link></td>
            <td>
                <button className='btn btn-sm btn-danger active'>Delete</button>
                <Link to="/add-modules/2" className='btn btn-success btn-sm active ms-3'>Add Module</Link>
            </td>
        </tbody>
            </table>
        </div>
    </div>
</section>
            </div>
        </div>
    );

}

export default TeacherCourses;
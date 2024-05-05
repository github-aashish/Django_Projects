
import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function MyUsers(){
    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
        <TeacherSidebar />
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">User List</h5>
        <div className="card-body">
            <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Enrolled Course</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Milan</td>
            <td><Link to="/">Python</Link></td>
            <td>
                <button className='btn btn-sm btn-danger active'>Delete</button>
            </td>
            </tr>
        </tbody>
            </table>
        </div>
    </div>
</section>
            </div>
        </div>
    );
}

export default MyUsers;
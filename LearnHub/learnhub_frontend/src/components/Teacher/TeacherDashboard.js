//import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function TeacherDashboard(){
    const teacherName = localStorage.getItem('teacherName')
    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar />
</aside>
<section className="col-md-9">
    <h2>Welcome {teacherName}</h2>
</section>
            </div>
        </div>
    );
}

export default TeacherDashboard;
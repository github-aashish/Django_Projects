//import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';

function Dashboard(){
    const studentName = localStorage.getItem('studentName')
    return (
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <Sidebar />
</aside>
<section className="col-md-9">
<h2>Welcome {studentName}</h2>
</section>
            </div>
        </div>
    );
}

export default Dashboard;
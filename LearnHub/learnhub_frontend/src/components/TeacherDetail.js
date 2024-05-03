import {Link} from 'react-router-dom'

function TeacherDetail(){
    return (<div className="container mt-3">
    <div className="row">
        <div className="col-4"><img src="/mteacher.avif" className="card-img-top" alt="Teacher"/></div>
        <div className="col-8"><h3>Ashish Chaudhary</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, consequuntur odio sed ullam consectetur facere, culpa repudiandae fugit ab placeat minima! Laboriosam tempora consectetur minima esse totam nobis optio doloribus. Ipsum eum voluptatem perferendis natus, odio aliquid, architecto sequi molestiae fuga deleniti nemo laboriosam eius. Dicta vero cumque nihil id.</p>
        <p className="fw-bold">Skills: <Link to="/category/php">Php</Link>, <Link to="/category/python">Python</Link>, <Link to="/category/Javascript">JavaScript</Link></p>
        <p className="fw-bold">Recent Course: <Link to="/teacher-detail/1">Php</Link></p>
        <p className="fw-bold">Rating: 4/5</p>
    </div>
    </div>
    <div className="card mt-4">
        <h5 className="card-header">
            Course List
        </h5>
        <div className="list-group list-group-flush">
            <Link to="/detail/1" className='list-group-item list-group-item-action'>Python</Link>
            <Link to="/detail/1" className='list-group-item list-group-item-action'>C</Link>
            <Link to="/detail/1" className='list-group-item list-group-item-action'>C++</Link>
            <Link to="/detail/1" className='list-group-item list-group-item-action'>Java</Link>
        </div>
    </div>
</div>);
}

export default TeacherDetail;
import { useParams } from "react-router-dom";    //This is a hook

function CourseDetail(){
    let {course_id} = useParams();
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4"><img src="/logo512.png" className="card-img-top" alt="Course Image"/></div>
                <div className="col-8"><h3>Course Title</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, consequuntur odio sed ullam consectetur facere, culpa repudiandae fugit ab placeat minima! Laboriosam tempora consectetur minima esse totam nobis optio doloribus. Ipsum eum voluptatem perferendis natus, odio aliquid, architecto sequi molestiae fuga deleniti nemo laboriosam eius. Dicta vero cumque nihil id.</p>
                <p className="fw-bold">Course By: <a href="#">Teacher 1</a></p>
                <p className="fw-bold">Duration: 3 Hours 30 minutes</p>
                <p className="fw-bold">Total Enrolled: 456 studenrs</p>
                <p className="fw-bold">Rating: 4/5</p>
            </div>
            </div>
            <div className="card mt-4">
                <div className="card-header">
                    Course Videos
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Introduction <button className="btn btn-sm btn-secondary float-end">Play</button></li>
                    <li className="list-group-item">Setup Project </li>
                    <li className="list-group-item">Start with Functional Componenet </li>
                </ul>
            </div>
        </div>
    );
}

export default CourseDetail;
import TeacherSidebar from "./TeacherSidebar";

function AddCourse(){
    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-md-9">
    <div className="card">
        <h5 className="card-header">Profile Setting</h5>
        <div className="card-body">
        <div className="mb-3 row">
        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
        <div className="col-sm-10">
            <input type="text" id="title" className="form-control"/>
        </div>
    </div>
    <div className="mb-3 row">
        <label htmlFor="desc" className="col-sm-2 col-form-label">Description</label>
        <div className="col-sm-10">
        <textarea className="form-control" id="desc"></textarea>
        </div>
    </div>
    <div className="mb-3 row">
        <label htmlFor="video" className="col-sm-2 col-form-label">Course Video</label>
        <div className="col-sm-10">
            <input type="file" id="video" className="form-control"/>
        </div>
    </div>
    <div className="mb-3 row">
        <label htmlFor="interest" className="col-sm-2 col-form-label">Technologies</label>
        <div className="col-sm-10">
            <textarea className="form-control" id="interest"></textarea>
        </div>
    </div>
    <hr />
    <button className='btn btn-primary'>Submit</button>
    
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default AddCourse;
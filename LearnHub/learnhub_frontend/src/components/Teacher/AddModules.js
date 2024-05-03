import TeacherSidebar from "./TeacherSidebar";

function AddModules(){
    return(
        <div className="container mt-5">
            <div className="row">
<aside className="col-md-3">
    <TeacherSidebar/>
</aside>
<section className="col-9">
    <div className="card">
        <h5 className="card-header">Add modules</h5>
        <div className="card-body">
            <form>
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
            <input type="text" id="title" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea className="form-control" id="desc"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="video" className="form-label">Featured Image</label>
            <input type="file" id="video" className="form-control"/>
    </div>
    <div className="mb-3">
        <label htmlFor="interest" className="form-label">Technologies</label>
            <textarea className="form-control" placeholder="This video is Focused on Basics...." id="interest"></textarea>
    </div>
    <hr />
    <button className='btn btn-primary'>Submit</button>
    </form>
        </div>
    </div>
    
</section>
            </div>
        </div>
    );
}

export default AddModules;
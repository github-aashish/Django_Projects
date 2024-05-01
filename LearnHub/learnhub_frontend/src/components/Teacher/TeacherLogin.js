//import {Link} from 'react-router-dom';

function TeacherLogin(){
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Teacher Login</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="uname" className="form-label">Username</label>
                                <input type="text" id="uname" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="upass" className="form-label">Password</label>
                                <input type="text" id="upass" className="form-control" />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" id="chk" className="form-check-input" />
                                <label htmlFor="chk" className="form-check-label">Remember Me?</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;
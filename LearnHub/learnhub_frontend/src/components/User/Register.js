//import {Link} from 'react-router-dom';

function Register(){
    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-6 offset-3">
            <div className="card">
                <h5 className="card-header">User Register</h5>
                <div className="card-body">
                    <form>
                    <div className="mb-3">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input type="text" id="fname" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uemail" className="form-label">Email</label>
                            <input type="email" id="uemail" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uname" className="form-label">Username</label>
                            <input type="text" id="uname" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="upass" className="form-label">Password</label>
                            <input type="text" id="upass" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="interest" className="form-label">Interests</label>
                            <textarea  id="interest" className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc...</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
function Logout(){
    localStorage.removeItem('studentLoginStatus');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentImage');
    window.location.href = '/user-login'
    return(<></>);
}

export default Logout;
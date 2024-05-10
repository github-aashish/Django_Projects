function Logout(){
    localStorage.removeItem('studentLoginStatus');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    window.location.href = '/user-login'
    return(<></>);
}

export default Logout;
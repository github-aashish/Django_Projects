function Logout(){
    localStorage.removeItem('studentLoginStatus');
    window.location.href = '/user-login'
    return(<></>);
}

export default Logout;
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import About  from './About'
import CourseDetail from './CourseDetail'
import Login from './User/Login'
import Register from './User/Register'
import Dashboard from './User/Dashboard'
import {Routes as Switch,Route} from 'react-router-dom'
import MyCourses from './User/MyCourses'
import FavouriteCourses from './User/FavouriteCourses'
import RecommendedCourses from './User/RecommendedCourses'
import ProfileSetting from './User/ProfileSetting'
import ChangePassword from './User/ChangePassword'
import TeacherLogin from './Teacher/TeacherLogin'
import TeacherRegister from './Teacher/TeacherRegister'
import TeacherDashboard from './Teacher/TeacherDashboard'
import TeacherCourses from './Teacher/TeacherCourses'
import AddCourse from './Teacher/AddCourse'
import MyUsers from './Teacher/MyUsers'
import TeacherProfileSetting from './Teacher/TeacherProfileSetting'
import TeacherChangePassword from './Teacher/TeacherChangePassword'
import TeacherDetail from './TeacherDetail'


function Main() {
  return (
    <>
    <Header/>
    <Switch>
     <Route path="/" element={ <Home/> }/>
     <Route path="/about" element={ <About/> }/>
     <Route path="/detail/:course_id" element={ <CourseDetail/> }/>
     <Route path="/user-login" element={ <Login/> }/>
     <Route path="/user-register" element={ <Register/> }/>
     <Route path="/user-dashboard" element={ <Dashboard/> }/>
     <Route path="/my-courses" element={ <MyCourses/> }/>
     <Route path="/favourite-courses" element={ <FavouriteCourses/> }/>
     <Route path="/recommended-courses" element={ <RecommendedCourses/> }/>
     <Route path="/profile-setting" element={ <ProfileSetting/> }/>
     <Route path="/change-password" element={ <ChangePassword/> }/>
     <Route path="/teacher-login" element={ <TeacherLogin/> }/>
     <Route path="/teacher-register" element={ <TeacherRegister/> }/>
     <Route path="/teacher-dashboard" element={ <TeacherDashboard/> }/>
     <Route path="/teacher-courses" element={ <TeacherCourses/> }/>
     <Route path="/add-courses" element={ <AddCourse/> }/>
     <Route path="/teacher-users" element={ <MyUsers/> }/>
     <Route path="/teacher-profile-setting" element={ <TeacherProfileSetting/> }/>
     <Route path="/teacher-change-password" element={ <TeacherChangePassword/> }/>
     <Route path="/teacher-detail/:teacher_id" element={ <TeacherDetail/> }/>

     </Switch>
     <Footer/>
    </>
  );
}

export default Main;
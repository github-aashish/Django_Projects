import {Routes as Switch,Route} from 'react-router-dom'


import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import About  from './About'
import CourseDetail from './CourseDetail'
import AllCourses from './AllCourses'

//User Components
import Login from './User/Login'
import Register from './User/Register'
import Dashboard from './User/Dashboard'
import MyCourses from './User/MyCourses'
import FavouriteCourses from './User/FavouriteCourses'
import RecommendedCourses from './User/RecommendedCourses'
import ProfileSetting from './User/ProfileSetting'
import ChangePassword from './User/ChangePassword'

//Teacher Components
import TeacherLogin from './Teacher/TeacherLogin'
import TeacherRegister from './Teacher/TeacherRegister'
import TeacherDashboard from './Teacher/TeacherDashboard'
import TeacherCourses from './Teacher/TeacherCourses'
import AddCourse from './Teacher/AddCourse'
import MyUsers from './Teacher/MyUsers'
import TeacherProfileSetting from './Teacher/TeacherProfileSetting'
import TeacherChangePassword from './Teacher/TeacherChangePassword'
import TeacherDetail from './TeacherDetail'
import PopularCourses from './PopularCourses'
import PopularTeachers from './PopularTeachers'
import CategoryCourses from './CategoryCourses'
import TeacherLogout from './Teacher/TeacherLogout'
import AddModules from './Teacher/AddModules'
import AllModules from './Teacher/AllModules'
import EditModule from './Teacher/EditModule'
import EditCourse from './Teacher/EditCourse'
import TeacherSkillCourses from './Teacher/TeacherSkillCourses'
import Logout from './User/Logout'


function Main() {
  return (
    <>
    <Header/>
    <Switch>
     <Route path="/" element={ <Home/> }/>
     <Route path="/about" element={ <About/> }/>
     <Route path="/detail/:course_id" element={ <CourseDetail/> }/>
     <Route path="/all-courses" element={ <AllCourses/> }/>
     <Route path="/category/:category_slug" element={ <CategoryCourses/> }/>
     <Route path="/popular-courses" element={ <PopularCourses/> }/>
     <Route path="/popular-teachers" element={ <PopularTeachers/> }/>
     <Route path="/user-login" element={ <Login/> }/>
     <Route path="/user-logout" element={ <Logout/> }/>
     <Route path="/user-register" element={ <Register/> }/>
     <Route path="/user-dashboard" element={ <Dashboard/> }/>
     <Route path="/my-courses" element={ <MyCourses/> }/>
     <Route path="/favourite-courses" element={ <FavouriteCourses/> }/>
     <Route path="/recommended-courses" element={ <RecommendedCourses/> }/>
     <Route path="/profile-setting" element={ <ProfileSetting/> }/>
     <Route path="/change-password" element={ <ChangePassword/> }/>
     <Route path="/teacher-login" element={ <TeacherLogin/> }/>
     <Route path="/teacher-logout" element={ <TeacherLogout/> }/>
     <Route path="/teacher-register" element={ <TeacherRegister/> }/>
     <Route path="/teacher-dashboard" element={ <TeacherDashboard/> }/>
     <Route path="/edit-course/:course_id" element={ <EditCourse/> }/>
     <Route path="/teacher-courses" element={ <TeacherCourses/> }/>
     <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={ <TeacherSkillCourses/> }/>
     <Route path="/all-modules/:course_id" element={ <AllModules/> }/>
     <Route path="/edit-module/:module_id" element={ <EditModule/> }/>
     <Route path="/add-courses" element={ <AddCourse/> }/>
     <Route path="/add-modules/:course_id" element={ <AddModules/> }/>
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
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
import EnrolledStudents from './Teacher/EnrolledStudents'
import AddAssignment from './Teacher/AddAssignment'
import ShowAssignment from './Teacher/ShowAssignment'
import Assignments from './User/Assignments'
import AddQuiz from './Teacher/AddQuiz'
import AllQuiz from './Teacher/AllQuiz'
import EditQuiz from './Teacher/EditQuiz'
import AllQuestions from './Teacher/AllQuestions'
import AddQuizQuestions from './Teacher/AddQuizQuestions'
import AssignQuiz from './Teacher/AssignQuiz'
import CourseQuizList from './User/CourseQuizList'
import TakeQuiz from './User/TakeQuiz'
import SearchCourses from './SearchCourses'
import AttemptedStudents from './Teacher/AttemptedStudents'


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
     <Route path="/enrolled-students/:course_id" element={ <EnrolledStudents/> }/>
     <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={ <TeacherSkillCourses/> }/>
     <Route path="/all-modules/:course_id" element={ <AllModules/> }/>
     <Route path="/edit-module/:module_id" element={ <EditModule/> }/>
     <Route path="/add-courses" element={ <AddCourse/> }/>
     <Route path="/add-modules/:course_id" element={ <AddModules/> }/>
     <Route path="/teacher-users" element={ <MyUsers/> }/>
     <Route path="/teacher-profile-setting" element={ <TeacherProfileSetting/> }/>
     <Route path="/teacher-change-password" element={ <TeacherChangePassword/> }/>
     <Route path="/teacher-detail/:teacher_id" element={ <TeacherDetail/> }/>
     <Route path="/add-assignment/:student_id/:teacher_id" element={ <AddAssignment/> }/>
     <Route path="/show-assignment/:student_id/:teacher_id" element={ <ShowAssignment/> }/>
     <Route path="/assignments" element={ <Assignments/> }/>
     <Route path="/add-quiz" element={ <AddQuiz/> }/>
     <Route path="/quiz" element={ <AllQuiz/> }/>
     <Route path="/edit-quiz/:quiz_id" element={ <EditQuiz/> }/>
     <Route path="/all-questions/:quiz_id" element={ <AllQuestions/> }/>
     <Route path="/add-quiz-questions/:quiz_id" element={ <AddQuizQuestions/> }/>
     <Route path="/assign-quiz/:course_id" element={ <AssignQuiz/> }/>
     <Route path="/course-quiz/:course_id" element={ <CourseQuizList/> }/>
     <Route path="/take-quiz/:quiz_id" element={ <TakeQuiz/> }/>
     <Route path="/search/:searchstring" element={ <SearchCourses/> }/>
     <Route path="/attempted-students/:quiz_id" element={ <AttemptedStudents/> }/>
     </Switch>
     <Footer/>
    </>
  );
}

export default Main;
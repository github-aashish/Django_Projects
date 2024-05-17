import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizinCourse(props){
    const [quizData, setQuizData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')

    useEffect (()=>{
        document.title = "Assign Quiz";
        try{
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`).then((res)=>{
                setQuizData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);


    const assignQuiz = (quiz_id)=>{
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', props.course);
        _formData.append('quiz', props.quiz);
                try{
                    axios.post(baseUrl+'/quiz-assign-course/',_formData).then((res)=>{
                        if(res.status===200 || res.status === 201){
                            Swal.fire({
                                title : 'Quiz has been Assigned',
                                icon : 'success',
                                toast : true,
                                timer : 2000,
                                position : 'top-right',
                                timerProgressBar : true,
                                showConfirmButton : false
                            });
                        }
                        setTimeout(()=>{
                            window.location.reload();
                        },2000);           
                    });  
                }
                catch(error){
                    console.log(error)
                }
};
return (
    <td>
        {quizData.bool === false && 
        <button onClick = {()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>
        }
        {quizData.bool === true && 
        <>
        <span className='btn btn-sm btn-secondary'>Successfully Assigned
        </span>
        {/* <Link className='btn btn-sm btn-info ms-2' to={`/attempted-students/` + props.quiz}>Attempted Students</Link>*/}
        </>
        }
    </td>
)


}

export default CheckQuizinCourse;
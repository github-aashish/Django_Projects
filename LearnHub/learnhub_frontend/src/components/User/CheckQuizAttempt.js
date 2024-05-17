import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizAttemp(props){
    const [quizData, setQuizData] = useState([]);
    const studentId = localStorage.getItem('studentId')

    useEffect (()=>{
        document.title = "Assign Quiz";
        try{
            axios.get(`${baseUrl}/fetch-quiz-attemp-status/${props.quiz}/${props.student}`).then((res)=>{
                setQuizData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

return (
    <td>
        {quizData.bool === false && 
        <Link to={`/take-quiz/${props.quiz}`} className='btn btn-success btn-sm ms-2'>Take Quiz</Link>
        }
        {quizData.bool === true && 
        <span className='text-success'>Attempted</span>
        }
    </td>
)


}

export default CheckQuizAttemp;
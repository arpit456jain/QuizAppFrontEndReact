import { Button } from 'primereact/button';
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateQuiz = () =>{
     const [value, setValue] = useState('');
     const [noOfQuestions, setNoOfQuestions] = useState('');
     const [selectedCategory, setSelectedCategory] = useState<any>(null);
     const [category,setCategory] = useState<any>([]); 
     const navigate = useNavigate();
     const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<any>(null);
     const [difficultyLevel,setDifficultyLevel] = useState<any>([]) ;

    useEffect(()=>{
        fetchCategory();
        fetchDifficultyLevel();
    },[])

    const fetchCategory=async()=>{
        await axios.get('http://localhost:8080/question/getCategory').then(
            response =>{
                setCategory(response?.data)
            }
        ).catch(error=>{
            console.log("error",error)
        })
    }

    const fetchDifficultyLevel=async()=>{
        await axios.get('http://localhost:8080/question/getDifficultyLevel').then(
            response =>{
                setDifficultyLevel(response?.data)
            }
        ).catch(error=>{
            console.log("error",error)
        })
    }

    const handleFormData=async()=>
    {
         if (!value || !selectedCategory || !selectedDifficultyLevel || !noOfQuestions) {
            alert('Please fill out all fields.');
            return;
            } 
        if(Number(noOfQuestions) > 20)
            alert("Max no of questions allowed is 20")

        let quizPayload  = {
            category : selectedCategory?.name,
            noOfQuestion : Number(noOfQuestions),
            title : value,
            difficulty : selectedDifficultyLevel?.name,

        }
        console.log("hi",quizPayload )
        

        await axios.post('http://localhost:8080/quiz/create',{},{params:quizPayload }).then(
            response =>{
                alert("created")
            }
        ).catch(error=>{
            console.log("error",error)
        })
    }
    const handleback=()=>{
        navigate('/');
    }
    return(<>
     <div className="flex flex-column align-items-center justify-content-center p-4">
        <div className="card flex justify-content-center">
            <Button label="back" onClick={handleback} />
        </div>
      <h1 className="mb-4">Welcome to the Quiz App</h1>

      <form >
        <div className="surface-card p-4 shadow-2 border-round w-full sm:w-20rem">
            

          <div className='mt-3'>
            <FloatLabel>
            <InputText
              id="quizName"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full md:w-17rem"
              
            />
            <label htmlFor="quizName">Quiz Name</label>
          </FloatLabel>
          </div>
          <div className='mt-2'>
            <Dropdown 
                id="category" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.value)} 
                options={category} optionLabel="name" 
                placeholder="Select category" 
                className="w-full md:w-17rem" 
                checkmark={true} 
                highlightOnSelect={false}
                filter
            />
                
          </div>
          <div className='mt-2 mb-2'>
            <Dropdown id="difficultyLevel" 
                value={selectedDifficultyLevel}
                onChange={(e) => setSelectedDifficultyLevel(e.value)} 
                options={difficultyLevel} 
                optionLabel="name" 
                placeholder="Select Difficulty Level" 
                className="w-full md:w-17rem" 
                checkmark={true} 
                highlightOnSelect={false}
             />
          </div>
          <div className='mt-3'>
            <FloatLabel>
            <InputText
              id="noOfQuestions"
              value={noOfQuestions}
              onChange={(e) => setNoOfQuestions(e.target.value)}
              className="w-full md:w-17rem"
              type='number'
              max={20}
            />
            <label  htmlFor="noOfQuestions">Number Of Questions max : 20</label>
          </FloatLabel>
          </div>
          <div className='mt-3'>
             <Button label="Create Quiz" type="button" onClick={handleFormData} />  
          </div>
        </div>
        
      </form>
    </div>
    </>)
};

export default CreateQuiz
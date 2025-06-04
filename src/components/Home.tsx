import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/create");
  };

  const [allQuiz, setAllQuiz] = useState<any>([
    
  ]);

  useEffect(()=>{
     fetchAllQuiz();
  },[])

  const fetchAllQuiz=()=>{
     axios.get('http://localhost:8080/quiz/getAllQuiz').then(response=>{
               setAllQuiz(response.data);
     }).catch(error=>{
          
     })
  }

 
  return (
    <>
      <div className="flex flex-wrap justify-content-center gap-4 p-4">
       {
          allQuiz.map((data:any,index:any)=>{
               return (
              <div className="surface-card border-round w-20rem">
               <Card title={data.title}>
                    <p className="m-0">
                         <ul>
                              <li>Category : {data.category}</li>
                              <li>No of Question : {data.no_of_questions}</li>
                         </ul>
                    </p>
                    <div className="flex flex-wrap justify-content-end gap-2">
                         <Button label="Play Quiz" icon="pi pi-check" onClick={() => navigate(`/quiz/create/${data.id}`)}  />
                    </div>
               </Card>
                
          </div>
          )})
       }


      </div>
      <div className="flex justify-content-center mt-4">
        <Button label="Create New Quiz" onClick={handleCreateQuiz} />
      </div>
    </>
  );
};

export default Home;

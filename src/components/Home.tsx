

import { Button } from 'primereact/button';    
import { useNavigate } from 'react-router-dom';
const Home=()=>{
     const navigate = useNavigate();

    const handleCreateQuiz = ()=>{
         navigate('/create');
    }

   return (
   <>
   <div>
    home page
    <div className="card flex justify-content-center">
            <Button label="Create Quiz"  onClick={handleCreateQuiz}/>
        </div>
   </div>
   </>
  );
};

export default Home;
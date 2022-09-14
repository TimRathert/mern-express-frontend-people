import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import People from '../pages/People';
import PeopleShow from '../pages/PeopleShow';
import Fish from '../pages/Fish';
import FishShow from '../pages/FishShow';

function Main() {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/people/" element={ <People />} />
            <Route path='/people/:id' element={ <PeopleShow /> } />   
            <Route path="/fish/" element={ <Fish />} />
            <Route path='/fish/:id' element={ <FishShow /> } />
        </Routes>
        
    </div>
  )
}

export default Main
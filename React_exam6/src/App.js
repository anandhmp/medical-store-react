
import Navbar from './components/Navbar';
import AddMedicine from './components/Medical/AddMedicine';
import MedicineListItem from './components/Medical/MedicineListItem';


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <Listmedicine/>
       <AddMedicine/>
       <MedicineListItem/>
       
      
       
        
      </div>
    </div>
  );
}

export default App;
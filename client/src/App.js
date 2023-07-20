import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Bankstate from './context/Bankstate';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Transactions from './components/Transactions';
import Customers from './components/Customers';
import TransferTable from './components/TransferTable';
import Login from './components/Login';
import Alert from './components/Alert';



function App() {
  
  return (
    <>
      <Bankstate>

        <BrowserRouter>
          <Navbar title="Bank System" aboutText="About us" />
          <Alert/>
          <div className="container">
            <Routes>
              <Route  exact path="/" element={<Home/>}/>
              <Route exact path="/customers" element={<Customers />} /> 
              <Route exact path="/transactions" element={<Transactions />} /> 
              <Route exact path="/transfers" element={<TransferTable />} /> 
              <Route exact path="/about" element={<About />} /> 
              <Route exact path="/login" element={<Login />} /> 
            </Routes>
          </div>
        </BrowserRouter>
    
      </Bankstate>


   

    </>

  );
}

export default App;

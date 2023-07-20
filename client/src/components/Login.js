import { useContext } from "react";
import { useState } from "react";
// import {useNavigate} from "react-router-dom";
import Bankcontext from "../context/Bankcontext";

function Login(props) {
    const context=useContext(Bankcontext);
    const {showalert}=context;
    const [cred, setcred] = useState({account:"",pin:""});
    // let navigate=useNavigate();
    const onchange=(e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response=fetch("http://localhost:80/api/create/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cred)
        });
        const json=(await response).json();
        json.then((response)=>{
            if(response.success){
                localStorage.setItem("auth-token",response.authtoken);
                // navigate("/transactions")
                showalert("Logged in Succesfully","success");
            }
            else{
                showalert("Invalid Credentials","danger");
            }
        })
        // window.onunload=()=>{
        //     localStorage.clear();
        // }
    
       
  
    }
    return (
    <div>
        <div className="my-3">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Account No</label>
                    <input  className="form-control" id="exampleFormControlTextarea1" name="account" onChange={onchange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Pin</label>
                    <input type={"password"} className="form-control" id="exampleInputPassword1" name="pin" onChange={onchange} required/>
                </div>
               
                <button type="submit" className="btn btn-primary" onSubmit={handlesubmit}>Login</button>
            </form>
        </div>
    </div>
  )
}
export default Login
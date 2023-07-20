import { useContext } from "react";
import Bankcontext from "../context/Bankcontext";

function Alert(props) {
  const context=useContext(Bankcontext);
  const {alert}=context;
  const show=(word)=>{
      if(word==="danger"){
        word="error"
      }
      const lower=word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height:"35px"}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fadeshow`} role='alert'>
            <strong>{show(alert.type)}</strong>: {alert.msg}
        </div>}
    </div>
  )
}
export default Alert
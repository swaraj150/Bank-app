import React from 'react'
import { useState } from 'react';
// import { useState } from 'react'

import Bankcontext from './Bankcontext'

const Bankstate=(props)=>{
    const customers=[];
    const host="http://localhost:80";
        
    
    const[entries,setentries]=useState(customers);

    const allcustomers=async()=>{
      const response=await fetch(`${host}/api/create/getallusers`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json'
          }
      });
      const json=await response.json();
      
      setentries(json);
  }
  const list=[];
    const[transfers,setlist]=useState(list);

    const alltransfers=async()=>{
      const response=await fetch(`${host}/api/transactions/fetchtransfers`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json'
          }
      });
      const json=await response.json();
      setlist(json);
  }
    
  // make a transaction
    const makeatransaction=async (account,amount)=>{
        const response=await fetch(`${host}/api/transactions/newtransaction`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWIzYTU4NjkyYTk5MWMyNzdkNzgwIn0sImlhdCI6MTY2Njg4ODY3OX0.1kuhlg4a9udb1tZOmCPYfNFTcgtkqsDnHmQIS2eXUsY"
            },
            body:JSON.stringify({account ,amount})
        });
    const json=await response.json();
    console.log(json);
 
}
const [alert, setalert] = useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },3000)

  }
    

    return (
        <Bankcontext.Provider value={{entries,transfers,allcustomers,alltransfers,makeatransaction,showalert,alert}}>
            {props.children}
        </Bankcontext.Provider>
    )
}




export default Bankstate
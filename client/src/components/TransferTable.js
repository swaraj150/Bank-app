import { useEffect } from "react";
import { useContext,useRef } from "react"
import Bankcontext from "../context/Bankcontext";

function TransferTable() {
    const context = useContext(Bankcontext);
    // let flag=false;
    const { showalert,allTransactionsOfUser,transactionsList } = context;
    let flag=useRef(false)
    // const transactions_paid=transactionsList.transactions_paid;
    console.log(transactionsList[0])
    useEffect(()=>{
        if(localStorage.getItem("auth-token")==null){
            flag.current=true;
            showalert("login to access your transaction history","danger");
        }
        else{
            flag.current=false;
            allTransactionsOfUser();
        }
    },[]);
    // convert this to user's transefer history
    return (
        <div className="my-3">
            <table className="table table-bordered">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Account No.</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {flag.current==false && transactionsList?.map((item,i)=>{
                        // console.log(item)
                        // console.log(flag)
                        var amount;
                        var account;
                        var name;
                        if(item.type==="paid"){
                            amount=item.amount
                            account=item.account;
                            name=item.receiverName
                        }
                        else{
                            account=item.senderAccount
                            amount="+"+item.amount;
                            name=item.senderName;
                        }
                        const amountStyle = {
                            color: item.type === "received" ? 'green' : 'inherit'
                        };
                        
                        return(
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{item.date}</td>
                                <td>{name}</td>
                                <td>{account}</td>
                                <td style={amountStyle}>{amount}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </table>
        </div>
    )
}
export default TransferTable
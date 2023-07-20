import { useEffect } from "react";
import { useContext } from "react"
import Bankcontext from "../context/Bankcontext";

function TransferTable() {
    const context=useContext(Bankcontext);
    const {transfers,alltransfers}=context;
    useEffect(() => {
        alltransfers();
    })

    return (
        <div className="my-3">
            <table className="table table-bordered">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Sender's ID</th>
                        <th scope="col">Receiver's Account No.</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {transfers?.map((item,i)=>{
                        return(
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{item.date}</td>
                                <td>{item.sender}</td>
                                <td>{item.account}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </table>
        </div>
    )
}
export default TransferTable
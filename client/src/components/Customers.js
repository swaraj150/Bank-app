import { useEffect } from "react";
import { useContext } from "react"
import Bankcontext from "../context/Bankcontext"

function Customers() {
    const context = useContext(Bankcontext);
    const {entries,allcustomers} = context;
    useEffect(() => {
        allcustomers(); 
    })
    

    return (
        <div className="my-3">
            <table className="table table-bordered">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Account No.</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>

                    {entries?.map((entry,i) => {
                        return (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{entry.name}</td>
                                <td>{entry.account}</td>
                                <td>{entry.email}</td>
                                <td>{entry.phone}</td>
                                <td>{entry.balance}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
export default Customers
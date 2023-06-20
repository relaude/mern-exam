import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
    const [invoices, setInvoices] = useState();

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await axios.get("/invoices");
                setInvoices(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getInvoices();
    }, []);

    return (
        <main>
            <h2>Invoice List</h2>

            {invoices?.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Customer Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, i) => (
                            <tr key={i}>
                                <td>{invoice?.invoiceNumber}</td>
                                <td>{invoice?.customerName}</td>
                                <td>
                                    <Link
                                        to={`/invoice/${invoice?.invoiceNumber}`}
                                    >
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Invoices to display</p>
            )}
        </main>
    );
};

export default Home;

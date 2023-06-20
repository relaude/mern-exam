import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const Invoice = () => {
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState({
        customerName: "",
        products: [
            {
                productName: "",
                productPrice: 0,
                productQuantity: 0,
            },
        ],
    });

    const handleCustomerNameChange = (e) => {
        const invoiceCopy = { ...invoice };
        invoiceCopy[e.target.name] = e.target.value;
        setInvoice(invoiceCopy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch("/invoices", invoice);
            return navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const totalPrice = invoice.products.reduce((total, product) => {
        const { productPrice, productQuantity } = product;
        return total + productPrice.$numberDecimal * productQuantity;
    }, 0);

    const { id } = useParams();
    const getInvoice = async () => {
        try {
            const response = await axios.get(`/invoices/${id}`);
            console.log(response.data);
            setInvoice(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getInvoice();
    }, []);

    return (
        <>
            <p>Invoice Number: {invoice.invoiceNumber}</p>
            <label>Customer Name:</label>
            <input
                type="text"
                name="customerName"
                value={invoice.customerName}
                onChange={handleCustomerNameChange}
            />

            <br />
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.products.map((p, i) => (
                        <tr key={i}>
                            <td>{p.productName}</td>
                            <td>{p.productPrice.$numberDecimal}</td>
                            <td>{p.productQuantity}</td>
                            <td>
                                {p.productQuantity *
                                    p.productPrice.$numberDecimal}
                            </td>
                            <td>
                                <button>edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tr>
                    <td td colSpan={4}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>Total</td>
                    <td>{totalPrice}</td>
                </tr>
            </table>

            <br />
            <br />

            <button onClick={handleSubmit}>Update</button>
        </>
    );
};

export default Invoice;

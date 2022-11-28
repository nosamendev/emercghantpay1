import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './TransactionDetails.css';

const TransactionDetails = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const transactions = useSelector(state => state.items.transactions);

    const transactionArr = transactions.filter((current, i) => {
        return id == current.id;
    });
    const transaction = transactionArr[0];

    const displayAmount = (str) => {
        return (str/100).toFixed(2);
    }

    return (
        <>
            <h1>Transaction Details</h1>
            <table className="transaction-details">
                <tbody>
                    <tr>
                        <th>Status</th>
                        <td>{transaction.status}</td>
                    </tr>
                    <tr>
                        <th>Created at</th>
                        <td>{transaction.created_at}</td>
                    </tr>
                    <tr>
                        <th>Merchant Name</th>
                        <td>{transaction.merchant_name}</td>
                    </tr>
                    <tr>
                        <th>Terminal Name</th>
                        <td>{transaction.terminal_name}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{transaction.type}</td>
                    </tr>
                    <tr>
                        <th>Error Class</th>
                        <td>{transaction.error_class}</td>
                    </tr>
                    <tr>
                        <th>Error Message</th>
                        <td>{transaction.error_message}</td>
                    </tr>
                    <tr>
                        <th>Card Holder</th>
                        <td>{transaction.card_holder}</td>
                    </tr>
                    <tr>
                        <th>Card Number</th>
                        <td>{transaction.card_number}</td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>{displayAmount(transaction.amount)}</td>
                    </tr>
                    <tr>
                        <th>Currency</th>
                        <td>{transaction.currency}</td>
                    </tr>
                    <tr>
                        <th>Unique ID</th>
                        <td>{transaction.unique_id}</td>
                    </tr>
                </tbody>

            </table>
            <span class="back" onClick={() => navigate(-1)}>&lt;&lt; Back to Transitions</span>
        </>
    )
}

export default TransactionDetails;
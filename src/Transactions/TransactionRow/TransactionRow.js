import React from 'react';
import { Link } from 'react-router-dom';

const TransactionRow = (props) => {

    const displayDate = (str) => {
        //removes the first two and the last 3 digits:
        return str.slice(2, 16);
    }

    const displayType = (str) => {
        return str.replace("Transaction", "");     
    }

    const displayErrorClass = (str) => {
        return str.replace("Module::", "").replace("Error", "");
    }

    const displayAmount = (str) => {
        return (str/100).toFixed(2) + " " + props.currency;
    }

    return (
        <>
            <tr>
                <td>{props.status}</td>
                <td><Link to={`/transactions/${props.id}`}>{displayDate(props.createdAt)}</Link></td>
                <td>{props.merchantName}</td>
                <td>{props.terminalName}</td>
                <td>{displayType(props.type)}</td>
                <td>{displayErrorClass(props.errorClass)}</td>
                <td>{props.cardHolder}</td>
                <td>{props.cardNumber}</td>
                <td>{displayAmount(props.amount)}</td>
                <td>{props.uniqueId}</td>
            </tr>
        </>
    );
}

export default TransactionRow;
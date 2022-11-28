import React from 'react';


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
        return (str/100).toFixed(2) + " USD";
    }

    return (
        <>
            <tr>
                <td>{props.status}</td>
                <td>{displayDate(props.createdAt)}</td>
                <td>{props.merchantName}</td>
                <td>{displayType(props.type)}</td>
                <td>{displayErrorClass(props.errorClass)}</td>
                <td>{props.cardHolder}</td>
                <td>{props.cardNumber}</td>
                <td>{displayAmount(props.amount)}</td>
            </tr>
        </>
    );
}

export default TransactionRow;
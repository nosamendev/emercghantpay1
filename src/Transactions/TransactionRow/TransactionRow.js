import React from 'react'

const TransactionRow = (props) => {
    return (
        <>
            <tr>
                <td>{props.status}</td>
                <td>{props.createdAt}</td>
                <td>{props.merchantName}</td>
                <td>{props.type}</td>
                <td>{props.errorClass}</td>
                <td>{props.cardHolder}</td>
                <td>{props.cardNumber}</td>
                <td>{props.amount}</td>
            </tr>
        </>
    );
}

export default TransactionRow;
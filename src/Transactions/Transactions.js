import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../store/fetchTransactionsSlice';
import Loader from '../Loader/Loader';
import TransactionRow from './TransactionRow/TransactionRow';
import './Transactions.css';

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.items.transactions);
    const status = useSelector(state => state.items.status);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, []);

    const displayTransactionRows = () => {
        let items = [];
        if (transactions) {
            transactions.map((current, i) => {
                return items[i] = <TransactionRow 
                    key={i}
                    status={current.status} 
                    createdAt={current.created_at}   
                    merchantName={current.merchant_name}
                    type={current.type}
                    errorClass={current.error_class}
                    cardHolder={current.card_holder}
                    cardNumber={current.card_number}
                    amount={current.amount}
                />
            });
        }         
        return items;
    }

    if (status === "loading") {
        return <Loader />
    }

    return (
        <main>
            <div className="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Created at</th>
                            <th>Merchant Name</th>
                            <th>Type</th>
                            <th>Error Class</th>
                            <th>Card Holder</th>
                            <th>Card Number</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTransactionRows()}
                    </tbody>
                </table>           
            </div>
        </main>
    )
}

export default Transactions;
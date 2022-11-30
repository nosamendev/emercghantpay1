import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, getError, loading } from '../store/fetchTransactionsSlice';
import Loader from '../Loader/Loader';
import TransactionRow from './TransactionRow/TransactionRow';
import SearchPanel from '../SearchPanel/SearchPanel';
import data from '../api/data';
import './Transactions.css';

const Transactions = () => {
    const dispatch = useDispatch();

    const status = useSelector(state => state.items.status);
    const error = useSelector(state => state.items.error);
    const alltransactions = useSelector(state => state.items.transactions);

    const [transactions, setTransactions] = useState([]);

    //remembers the 'th > span' tag of the last table sort:
    const [sortedByTarget, setSortedByTarget] = useState(null);   

    const [searchDates, setSearchDates] = useState({
        fromDate: "", 
        fromTime: "",
        toDate: "",
        toTime: ""
    });

    useEffect(() => {
        dispatch(loading('loading'));

        const fetchData = async () => {  
            try {
                let response = await data.get('http://localhost:3000/payment_transactions');
                dispatch(getTransactions(response.data));   
                setTransactions(response.data);           

                dispatch(loading('idle'));
            } catch (error) {
                dispatch(getError(error.message));
                dispatch(loading('idle'));
            }
        }    
        fetchData(); 
    }, []);

    const displayTransactionRows = () => {
        let items = [];
        if (transactions) {
            transactions.map((current, i) => {
                return items[i] = <TransactionRow 
                    key={i}
                    id={current.id}
                    status={current.status} 
                    createdAt={current.created_at}   
                    merchantName={current.merchant_name}
                    terminalName={current.terminal_name}
                    type={current.type}
                    errorClass={current.error_class}
                    cardHolder={current.card_holder}
                    cardNumber={current.card_number}
                    amount={current.amount}
                    currency={current.currency}
                    uniqueId={current.unique_id}
                />
            });
        }         
        return items;
    }

    const sortTransactions = (e, str) => {
        let sorted = [...transactions];

        //if it's not sorted in the same column:
        if (sortedByTarget && sortedByTarget !== e.target) {           
            sortedByTarget.className = "";           
        }

        if (e.target.className === "" || e.target.className === "desc") {
            sorted.sort(function(a, b){
                let x = a[str].toLowerCase();
                let y = b[str].toLowerCase();
                if (x < y) {return -1}
                if (x > y) {return 1}
                return 0;
            });
    
            setTransactions(sorted);
                       
            e.target.className = "asc";
            setSortedByTarget(e.target);             
        }
        else {
            //className = "asc":
            sorted.sort(function(a, b){
                let x = a[str].toLowerCase();
                let y = b[str].toLowerCase();
                if (x > y) {return -1}
                if (x < y) {return 1}
                return 0;
            });
    
            setTransactions(sorted);
            
            e.target.className = "desc";
            setSortedByTarget(e.target);            
        }
    }
    const displaySearchResults = () => {
        const fromDate = new Date(searchDates.fromDate + ' ' + searchDates.fromTime);
        const toDate = new Date(searchDates.toDate + ' ' + searchDates.toTime);
        
        const result = transactions.filter((current, i) => {
            const currentDate = new Date(current.created_at);
            if ((fromDate <= currentDate) && (currentDate <= toDate)) {
                return current;
            }
        });
        setTransactions(result);
    }

    const deleteFilter = () => {
        setTransactions(alltransactions);
        setSearchDates({
            fromDate: "", 
            fromTime: "",
            toDate: "",
            toTime: ""
        });
    }


    const handleSearchDateChange = (name, value) => {
        setSearchDates({...searchDates, [name]: value});
    }
    

    if (status === "loading") {
        return <Loader />
    }
    if (error){
        return <p>{error}</p>
    }

    return (
        <main>
            <h1>Payment Transactions</h1>
            <SearchPanel handleSearchDateChange={handleSearchDateChange} searchDates={searchDates} displaySearchResults={displaySearchResults} deleteFilter={deleteFilter} />
            <div className="wrapper">
                <table className="transactions">
                    <thead>
                        <tr>
                            <th><span onClick={(e) => sortTransactions(e, 'status')}>Status</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'created_at')}>Created at</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'merchant_name')}>Merchant Name</span></th>
                            <th>Terminal Name</th>
                            <th><span onClick={(e) => sortTransactions(e, 'type')}>Type</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'error_class')}>Error Class</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'card_holder')}>Card Holder</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'card_number')}>Card Number</span></th>
                            <th><span onClick={(e) => sortTransactions(e, 'amount')}>Amount</span></th>
                            <th>Unique ID</th>
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
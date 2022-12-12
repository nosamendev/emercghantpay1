import { render, screen } from "@testing-library/react";
import Transactions from "./Transactions";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



test("test if the table header cells are rendered", async () => {
    const initialState = { 
        items: {
            status: "idle",
            error:"",
            transactions: [
                { 
                    id: "1", 
                    status: "approved",
                    created_at: "2017-06-16 06:30:02",
                    merchant_name: "Merchant_115",
                    terminal_name: "Terminal 1",
                    type: "SaleTransaction",
                    error_class: "",
                    error_message: "",
                    card_holder: "Manfred Man",
                    card_number: "421234...1234",
                    amount: "12000",
                    currency: "USD",
                    unique_id: "3afed9dd95ecb85bd723c7f3b0f71550" 
                },
                { 
                    id: "2", 
                    status: "error",
                    created_at: "2017-06-16 13:01:32",
                    merchant_name: "Merchant_126",
                    terminal_name: "Terminal 13",
                    type: "Sale3dTransaction",
                    error_class: "Module::ConfigurationError",
                    error_message: "Selected gateway is for test use only!",
                    card_holder: "John Doe",
                    card_number: "450000...0000",
                    amount: "50",
                    currency: "USD",
                    unique_id: "4afed9dd95ecb85bd723c7f3b0f71551" 
                }
            ]
        }
    };
    const mockStore = configureStore();
    let store;

    store = mockStore(initialState);
        render(
            <Provider store={store}>
                <Transactions />
            </Provider>
        );

        const ths = await screen.findAllByRole("columnheader");
        expect(ths).toHaveLength(10);

        //const trs = await screen.findAllByRole("row");
        //expect(trs).toHaveLength(3);

});

test("test sorting", async () => {
    const initialState = { 
        items: {
            status: "idle",
            error:"",
            transactions: [
                { 
                    id: "1", 
                    status: "approved",
                    created_at: "2017-06-16 06:30:02",
                    merchant_name: "Merchant_115",
                    terminal_name: "Terminal 1",
                    type: "SaleTransaction",
                    error_class: "",
                    error_message: "",
                    card_holder: "Manfred Man",
                    card_number: "421234...1234",
                    amount: "12000",
                    currency: "USD",
                    unique_id: "3afed9dd95ecb85bd723c7f3b0f71550" 
                },
                { 
                    id: "2", 
                    status: "error",
                    created_at: "2017-06-16 13:01:32",
                    merchant_name: "Merchant_126",
                    terminal_name: "Terminal 13",
                    type: "Sale3dTransaction",
                    error_class: "Module::ConfigurationError",
                    error_message: "Selected gateway is for test use only!",
                    card_holder: "John Doe",
                    card_number: "450000...0000",
                    amount: "50",
                    currency: "USD",
                    unique_id: "4afed9dd95ecb85bd723c7f3b0f71551" 
                }
            ]
        }
    };
    const mockStore = configureStore();
    let store;

    store = mockStore(initialState);
    const user = userEvent.setup();
    render(
        <Provider store={store}>
            <Router>
                <Transactions />
            </Router>
        </Provider>
    );
    
    const statusSpan = await screen.findByText('Status');
    await user.click(statusSpan);    
    expect(statusSpan).toHaveClass("asc");

    let tds = await screen.findAllByRole("cell");
    let status1 = tds[0];
    expect(status1).toHaveTextContent("approved");

    await user.click(statusSpan);
    expect(statusSpan).toHaveClass("desc");

    tds = await screen.findAllByRole("cell");
    status1 = tds[0];
    expect(status1).toHaveTextContent("error");


});
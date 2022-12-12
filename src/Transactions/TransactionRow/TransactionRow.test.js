import { render, screen } from "@testing-library/react";
import TransactionRow from "./TransactionRow";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from 'react-router-dom';

test("test if the table row cells are rendered", async () => {
    const props = {
        id: 2,
        status: "error",
        createdAt: "2017-06-16 13:01:32",
        merchantName: "Merchant_126",
        terminalName: "Terminal 13",
        type: "Sale3dTransaction",
        errorClass: "Module::ConfigurationError",
        errorMessage: "Selected gateway is for test use only!",
        cardHolder: "John Doe",
        cardNumber: "450000...0000",
        amount: "50",
        currency: "USD",
        uniqueId: "4afed9dd95ecb85bd723c7f3b0f71551"
      };
    render(
        <Router>
            <TransactionRow {...props}/>
        </Router>
    );

    const tr = await screen.findAllByRole("row");
    expect(tr).toHaveLength(1);

    const tds = await screen.findAllByRole("cell");
    const errorClass = tds[5];
    expect(errorClass).toHaveTextContent("Configuration");
    
});
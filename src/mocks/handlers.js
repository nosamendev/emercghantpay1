import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/payment_transactions", (req, res, ctx) => {
    return res(
      ctx.json([
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
        },
      ])
    );
  })
];

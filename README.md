# Mortgage Calculator App

This is a simple mortgage calculator application built with React.

## Installation

First, make sure you have [Node.js Latest version](https://nodejs.org/) installed on your machine.

1. Clone this repository:

   ```bash
   git clone https://github.com/DevDiegoVillalobos/LoanCalculator.git

    Then, navigate to the project directory: 

   ```bash
   cd mortgage-calculator-app

    Install dependencies:
        npm install
        **or**
        yarn install
        **or**
        pnpm install

2. Run the app:

    Run the development server:

    npm run dev
    **or**
    yarn dev
    **or**
    pnpm dev
    **or**
    bun dev

3. Modifying the Code

MortgageCalculator Component

The MortgageCalculator component is located in the app/components/mortgage_calculator.tsx file. 
You can modify the initial values and customize the display of the button with the following props:

    1. amountMortg: Initial principal amount.
    2. interestRate: Initial annual interest rate.
    3. loanTerm: Initial loan term in years.
    4. displayButton: Boolean to determine whether to display the button (default is false).
    5. buttonText: Text for the optional button (only relevant if displayButton is true).
    6. buttonLink: Link to navigate when the button is clicked (only relevant if displayButton is true).

Feel free to copy and paste the MortgageCalculator component and import it into other parts of your application, adjusting the props as needed.
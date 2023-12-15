import MortgageCalculator from "../../components/mortgage_calculator";
import { ModeToggle } from "../../components/ui/mode_toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="grid grid-cols-1 gap-8 justify-items-center">
        <div className="md:col-span-1">
          <ModeToggle />
        </div>
        <div>
          <MortgageCalculator
            amountMortg={100}
            interestRate={5.5}
            loanTerm={1}
            
            displayButton={true}
            buttonText="Go to Another Page"
            buttonLink="/"
          />
        </div>
      </div>
    </main>

  )
}
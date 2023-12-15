import MortgageCalculator from '@/components/mortgage_calculator'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode_toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="grid grid-cols-1 gap-8 justify-items-center">
        <div className="md:col-span-1">
          <ModeToggle />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Go to localhost:3000/calculator</h1>
          <div className="flex items-center justify-center mb-4">
            <div className="border-t border-gray-400 flex-grow mr-4"></div>
            <span className="text-gray-500">or</span>
            <div className="border-t border-gray-400 flex-grow ml-4"></div>
          </div>
          <a href="/calculator">
            <Button type="button">Click here</Button>
          </a>
        </div>
      </div>
    </main>
  )
}

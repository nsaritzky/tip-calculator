import { useEffect, useState } from "react"
import React, { useRef } from "react"

import personIcon from "/images/icon-person.svg"
import dollarIcon from "/images/icon-dollar.svg"

interface TipPercentageButtonProps {
  percentage: number
  tip: number | undefined
  onClick: () => void
}

const TipPercentageButton: React.FC<TipPercentageButtonProps> = ({
  percentage,
  tip,
  onClick,
}) => (
  <button
    className={`rounded px-4 py-2 text-[24px] text-white  ${
      tip == percentage
        ? "bg-strong-cyan"
        : "bg-very-dark-cyan hover:bg-light-grayish-cyan hover:text-very-dark-cyan"
    }`}
    onClick={onClick}
  >
    {percentage}%
  </button>
)

function App() {
  const [bill, setBill] = useState<number>(0)
  const [tip, setTip] = useState<number>()
  const [customTip, setCustomTip] = useState<number>()
  const [customActive, setCustomActive] = useState(false)
  const [people, setPeople] = useState<number>(0)
  const customInputRef = useRef<HTMLInputElement>(null)

  const formattedTip = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(tip ? ((bill || 0) * tip) / 100 / (people || 1) : 0)

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    tip
      ? (bill || 0) / (people || 1) + ((bill || 0) * tip) / 100 / (people || 1)
      : 0,
  )

  useEffect(() => {
    if (customActive) {
      customInputRef.current?.focus()
    }
  }, [customActive])

  return (
    <div className="flex h-screen items-center justify-end sm:justify-center">
      <div className="align-center">
        <div className="text-center text-very-dark-cyan">S P L I</div>
        <div className="text-center text-very-dark-cyan">T T E R</div>
        <div className="mx-0 mt-8 flex h-full w-full flex-wrap justify-between rounded-t-3xl bg-white p-6 sm:mx-auto sm:h-auto sm:w-[45rem] sm:rounded-3xl">
          <div className="flex w-full flex-col items-start sm:w-80">
            <div className="text-very-dark-cyan">Bill</div>
            <div className="relative mb-6 w-full rounded bg-very-light-grayish-cyan ">
              <input
                type="number"
                className="w-full rounded bg-very-light-grayish-cyan py-2 pl-10
                pr-4 text-right text-[24px] text-grayish-cyan outline-none focus:outline focus:outline-2 focus:outline-strong-cyan"
                value={bill}
                onChange={(e) => setBill(parseFloat(e.target.value))}
                placeholder="0"
                onFocus={(e) => {
                  e.target.select()
                }}
              />
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                src={dollarIcon}
                alt="dollar"
              />
            </div>
            <div className="mb-4 text-very-dark-cyan">Select Tip %</div>
            <div className="mb-6 grid w-full grid-cols-3 gap-3">
              <TipPercentageButton
                percentage={5}
                tip={tip}
                onClick={() => {
                  setTip(5)
                }}
              />
              <TipPercentageButton
                percentage={10}
                tip={tip}
                onClick={() => {
                  setTip(10)
                }}
              />
              <TipPercentageButton
                percentage={15}
                tip={tip}
                onClick={() => {
                  setTip(15)
                }}
              />
              <TipPercentageButton
                percentage={25}
                tip={tip}
                onClick={() => {
                  setTip(25)
                }}
              />
              <TipPercentageButton
                percentage={50}
                tip={tip}
                onClick={() => {
                  setTip(50)
                }}
              />
              {customActive ? (
                <input
                  className="rounded bg-very-light-grayish-cyan pr-2 text-right text-[24px] text-dark-grayish-cyan"
                  ref={customInputRef}
                  type="number"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(parseFloat(e.currentTarget.value))
                    setTip(undefined)
                  }}
                  onBlur={() => {
                    if (!customTip) {
                      setCustomActive(false)
                    }
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    setCustomActive(true)
                  }}
                  className=" rounded bg-very-light-grayish-cyan text-[24px] text-dark-grayish-cyan"
                >
                  Custom
                </button>
              )}
            </div>
            <div className="text-very-dark-cyan">Number of People</div>
            <div className="relative mb-6 w-full rounded bg-very-light-grayish-cyan">
              <input
                type="number"
                className="w-full rounded bg-very-light-grayish-cyan py-2 pl-10
              pr-4 text-right text-[24px] text-grayish-cyan focus:outline focus:outline-2 focus:outline-strong-cyan"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
                placeholder="0"
                onFocus={(e) => {
                  e.target.select()
                }}
              />
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                src={personIcon}
                alt="dollar"
              />
            </div>
          </div>
          <div className=" flex w-full flex-col justify-between rounded-3xl bg-very-dark-cyan p-8 sm:w-80">
            <div>
              <div className="my-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-left text-white">Tip Amount</div>
                  <div className="ml-2 text-left text-sm text-grayish-cyan">
                    / person
                  </div>
                </div>
                <div className="text-[36px] text-strong-cyan">
                  {formattedTip}
                </div>
              </div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="text-left text-white">Total</div>
                  <div className="ml-2 text-left text-sm text-grayish-cyan">
                    / person
                  </div>
                </div>
                <div className="text-[36px] text-strong-cyan">
                  {formattedTotal}
                </div>
              </div>
            </div>
            <button
              className=" w-full rounded bg-strong-cyan py-2 text-[24px] text-very-dark-cyan hover:bg-light-grayish-cyan"
              onClick={() => {
                setBill(0)
                setTip(undefined)
                setCustomTip(undefined)
                setCustomActive(false)
                setPeople(0)
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

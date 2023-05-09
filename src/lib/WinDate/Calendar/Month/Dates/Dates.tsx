import { useRef, useLayoutEffect, forwardRef, ForwardedRef, MutableRefObject, UIEvent } from "react"
import { useContext } from "react"
import { GlobalContext } from "../../../../Context/Global"
import DateButton from "./DateButton/DateButton"
import type { DatesFormat } from "../type"
import styles from "./dates.module.css"

interface Props {
  dates: DatesFormat[]
  setPreviousMonth: () => void
  setNextMonth: () => void
}

const Dates = forwardRef(({ dates, setPreviousMonth, setNextMonth }: Props, dateContainerRef: ForwardedRef<HTMLDivElement>) => {
  const { isSwitchingTimeline } = useContext(GlobalContext)
  const firstDayOfChosenMonthButtonRef = useRef<HTMLButtonElement>(null!)

  const className = `${styles.dates} ${isSwitchingTimeline ? styles.switchTimeline : ""}`

  useLayoutEffect(() => {
    (dateContainerRef as MutableRefObject<HTMLDivElement>).current.scrollTop = firstDayOfChosenMonthButtonRef.current.offsetTop
  }, [dates])

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement
    const { clientHeight, scrollTop, scrollHeight } = target
    const hasReachedTop = scrollTop === 0
    const hasReachedBottom = clientHeight + scrollTop === scrollHeight

    if (hasReachedTop) {
      setPreviousMonth()
    }

    if (hasReachedBottom) {
      console.log("bottom")
      setNextMonth()
    }
  }

  return (
    <div className={className} ref={dateContainerRef} onScroll={handleScroll}>
      {dates.map((date, index) => {
        return (
          <DateButton
            key={index}
            date={date}
            ref={date.isFirstDayOfCurrentMonth ? firstDayOfChosenMonthButtonRef : null}
          />
        )
      })}
    </div>
  )
})

export default Dates
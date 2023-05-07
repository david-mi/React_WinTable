import { useContext } from "react"
import { GlobalContext } from "../../../../../Context/Global"
import type { MonthsFormat } from "../../type"
import { handleTimeout } from "../../../../utils"
import styles from "./monthButton.module.css"

interface Props {
  month: MonthsFormat
}

const MonthButton = ({ month }: Props) => {
  const {
    getMonthAbbrev,
    getFormatedDate,
    isFromChosenYear,
    isCurrentMonth,
    isChosenMonth
  } = month

  const { setDate, setTimeline, setIsSwitchingTimeline } = useContext(GlobalContext)

  function preTimeoutCallback() {
    setIsSwitchingTimeline(true)
  }

  function timeoutCallback() {
    const newDate = new Date(getFormatedDate)
    setDate(newDate)
    setTimeline("MONTH")
    setIsSwitchingTimeline(false)
  }

  return (
    <button
      data-testid="month"
      data-current-month={isCurrentMonth}
      data-chosen-year={isFromChosenYear}
      data-chosen-month={isChosenMonth}
      className={styles.month}
      onClick={handleTimeout({ timeoutCallback, preTimeoutCallback, delay: 200 })}
    >
      {getMonthAbbrev}
    </button>
  )
}

export default MonthButton
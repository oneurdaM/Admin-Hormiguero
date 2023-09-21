import React from 'react'

import style from './checkbox.module.css'

function DayCheckbox({ day, checked, handleOnClick }: { day: string, checked: boolean, handleOnClick: any }) {    
  return (
    <>
      <input className={style.input} type="checkbox" id={`weekday-${day}`} checked={checked} onChange={handleOnClick} value={day}/>
      <label className={style.label} htmlFor={`weekday-${day}`}>
        {day}
      </label>
    </>
  )
}

export default DayCheckbox

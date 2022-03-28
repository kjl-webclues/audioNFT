import React from 'react'

const Checkbox = ({id, type, name, handleClick, isChecked}) => {
  return (
    <input 
      id={id}
      type={type}
      name={name}
      onChange={handleClick}
      checked={isChecked}
    />
  )
}

export default Checkbox
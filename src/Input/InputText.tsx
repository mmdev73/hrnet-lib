import React, { useEffect, useState} from 'react'
import './InputText.scss'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  type?: string
  id?: string
  name?: string
  regex?: RegExp
  labelPosition?: 'left' | 'right' | 'center'
}

/**
 * A component for rendering an input field with a label and a regex check.
 * Props:
 * - label : The label of the input field. It is required.
 * - onChange : The function to handle changes to the input field. It is required.
 * - id : The id of the input field. Default is `hrnet-input`. It should be set to a unique value.
 * - value : The value of the input field. Default is an empty string.
 * - type : The type of the input field. Default is `text`.
 * - regex : The regular expression to check the input value against. Default is `null`.
 * - labelPosition : The position of the label. Options are `left`, `right`, and `center`. Default is `left`.
*/
const InputText:React.FC<InputProps> = ({ 
  label, 
  onChange,   
  id = 'hrnet-input',
  value = '', 
  type = 'text', 
  regex = null,
  labelPosition = 'left'
}) => {
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    if(regex && regex!=null && value.length > 0){
      if(!regex.test(value)){
        setError(true)
      }
      else{
        setError(false)
      }
    }
  }, [value])
  
  return (
  <>
    <div className="input__group">
      <label htmlFor={id} className={`input__group__label input__group__label--${labelPosition}`}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={id}
        name={id}
        type={type}
        className={`input__group__input${(error !== null && error) ? ' input__group__input--error' : ''}`}
      />
    </div>
  </>
  )
}

export default InputText;

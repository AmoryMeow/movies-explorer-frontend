import './Input.css';

function Input({id, name, type = "text", placeholder, errorText}) {
  return (
    <article className="input">
      <label class="input__label" for={id}>{placeholder}</label>
      <input class={`input__field ${errorText && 'input__field_error'}`} id={id} type={type} name={name} 
        placeholder={placeholder} required minlength="2" maxlength="30"/>
      <span className={`input__error ${errorText && 'input__error_visible'}`}>{errorText}</span>
    </article>
  )
}

export default Input;
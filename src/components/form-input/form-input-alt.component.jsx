import './form-input.styles.scss'

const FormInputAlt = ({ label, inputOptions}) => 
{
    return (
        <div className='group'>
            <input className='form-input' {...inputOptions} />
            {label && (
                <label 
                className={`${
                    inputOptions.value.length ? 'shrink' : ''
                    } form-input-label`}>{label}</label>)}
        </div>
    );
}

export default FormInputAlt;
export default function CustomInput({ id, label, inputBoxStyle, labelStyle, inputStyle, ...props }) {

    return(
        <p className={inputBoxStyle}>
            {label && 
                <label 
                    className={labelStyle} 
                    htmlFor={id}>
                        {label}
                    </label>
            }
            <input 
                className={inputStyle} 
                id={id} 
                name={id} 
                {...props}
            />
        </p>
    )
}

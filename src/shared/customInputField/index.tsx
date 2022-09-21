import { InputField } from "./style"

interface InputProps {
    type?: string,
    disable?: boolean,
    isReadOnly?: boolean,
    className?: string,
    value?: any,
    onChange?: any,
    placeholder?: any,
    min?: string,
    max?: string,
}
export const CustomInputField = (props: InputProps) => {
    const { disable, className, value, onChange, placeholder, isReadOnly, type, min = 0, max } = props
    return (
        <InputField onChange={onChange} min={min} max={max} value={value} className={className} disabled={disable} placeholder={placeholder} type={type} />
    )
}
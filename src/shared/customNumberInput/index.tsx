import { Label, Image } from "./style"
import logo from "../../assets/icons/G03.png"

interface InputProps {
    type?: string,
    disable?: boolean,
    isReadOnly?: boolean,
    className?: string,
    value?: any,
    onChange?: any,
    placeholder?: any,
    maxOut?: any,
    disableMaxout?:boolean,
    isMatic?: boolean
}

export const CustomNumberInput = (props: InputProps) => {
    const { disable, className, value, onChange, placeholder, maxOut, isReadOnly , disableMaxout , isMatic} = props
    return (
        <Label isMatic={isMatic}>
            <Image src={logo} alt="logo" />
            <input onChange={onChange} readOnly={isReadOnly} value={value} className={className} disabled={disable} placeholder={placeholder} type="number" />
            <span className="maxOutButton" style={{ visibility: isReadOnly || disableMaxout ? 'hidden' : 'visible' }} onClick={maxOut}>Max</span>
        </Label>
    )
}
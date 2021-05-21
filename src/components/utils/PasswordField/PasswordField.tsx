import React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

interface PasswordFieldProps {
    password: string
    setPassword: (password: string) => any
    label: string
    helperText?: string
    name?: string
}

const PasswordField: React.FC<PasswordFieldProps & FormControlProps> = ({
    password,
    setPassword,
    label,
    helperText,
    name,
    ...rest
}) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault()

    const i = Math.floor(Math.random() * 100000)

    return (
        <FormControl variant="outlined" {...rest}>
            <InputLabel htmlFor={`password-field-${i}`}>{label}</InputLabel>
            <OutlinedInput
                id={`password-field-${i}`}
                type={showPassword ? 'text' : 'password'}
                value={password}
                name={name}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={label.length * 9}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default PasswordField

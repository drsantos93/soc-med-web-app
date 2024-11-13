import { forwardRef } from "react";
import { TextField } from "@mui/material";

// if you want to avoid using jquery, use forwardRef instead.
// forwardRef = gets DOM methods: .value
// forwardRef can be use inside a loop, without even using an id property
// take note: not destructuring props can lead to performance issues
// reason for using not destructing props: TOO LAZY
const CustomInput = forwardRef(function CustomInput(props,ref){
    return (
        <TextField ref={ref}  {...props} />
    )
})

export default CustomInput
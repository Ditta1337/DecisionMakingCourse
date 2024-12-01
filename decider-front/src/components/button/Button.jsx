import React from "react"
import "./Button.scss"
import classNames from "classnames";

const Button = ({children, onClick, type="primary", disabled=false}) => {
    return (
        <button onClick={!disabled ? onClick : null} className={classNames("button", type, {"disabled": disabled})}>
            {children}
        </button>
    )
}

export default Button
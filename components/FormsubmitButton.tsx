'use client'

import React, { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

type FormsubmitButtonProps = ComponentProps<'button'> & {
    children: React.ReactNode
    className?: string
}

const FormsubmitButton = ({
    children,
    className,
    ...props
}: FormsubmitButtonProps) => {
    const { pending } = useFormStatus()
    return (
        <button
            {...props}
            className={`btn btn-primary ${className}`}
            type="submit"
            disabled={pending}
        >
            {pending && <span className="loading loading-spinner" />}
            {children}
        </button>
    )
}

export default FormsubmitButton

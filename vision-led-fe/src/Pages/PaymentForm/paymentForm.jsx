import React from 'react'
import PaymentFormHeader from './PaymentFormHeader/paymentFormHeader'
import PaymentFormContent from './PaymentFormContent/paymentFormContent'
import PaymentFormFooter from './PaymentFormFooter/paymentFormFooter'

export default function PaymentForm() {
    return (
        <>
            <PaymentFormHeader />
            <PaymentFormContent />
            <PaymentFormFooter />
        </>
    )
}

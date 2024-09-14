import React from 'react'
import PaymentHeader from './Components/PaymentHeader/paymentHeader'
import PaymentContent from './Components/PaymentContent/paymentContent'
import PaymentFooter from './Components/PaymentFooter/paymentFooter'
import './Components/payment.css'
export default function Payment() {
  return (
    <>
        <PaymentHeader />
        <PaymentContent />
        <PaymentFooter />
    </>
  )
}

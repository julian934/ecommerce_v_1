"use client"
import CartItems from "@/app/components/cartItems"

const Cart = () => {
  return (
   <div className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
   aria-modal="true"
   role="dialog"
   tabIndex="-1">
      <CartItems/>
   </div>

  )
}

export default Cart
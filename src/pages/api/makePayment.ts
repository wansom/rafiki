interface PaystackResponse {
  status: boolean
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function initiatePayment(amount: number, email: string): Promise<PaystackResponse> {
  const paystackSecretKey = 'sk_live_c57cbcda87689469c80f647cc96096a85b0ac78a'

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: amount * 100 
      })
    })

    const data = await response.json()

    return {
      status: data.status,
      data: {
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference
      }
    }
  } catch (error: any) {
    console.error('Error initiating payment:', error.message)
    throw error
  }
}

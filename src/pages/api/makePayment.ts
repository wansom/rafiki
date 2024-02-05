interface PaystackResponse {
    status: boolean;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  }
  
  export async function initiatePayment(amount: number, email: string): Promise<PaystackResponse> {
    const paystackSecretKey = 'sk_test_89a2c06baca4c2ddb344faf31249266d56a52ef9';
  
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack expects amount in kobo (1 Naira = 100 kobo)
        }),
      });
  
      const data = await response.json();
  
      return {
        status: data.status,
        data: {
          authorization_url: data.data.authorization_url,
          access_code: data.data.access_code,
          reference: data.data.reference,
        },
      };
    } catch (error:any) {
      console.error('Error initiating payment:', error.message);
      throw error;
    }
  }
  
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";


const PaymentForm = () => 
{
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 10000 })
        }).then(res => res.json())
        .catch(error => console.log(error));
        
        // client secret links is used for the payment to link the intent to the 
        // payment
        const { paymentIntent: {client_secret} } = response;
        if(client_secret)
        {
            alert(client_secret);
        }


        // TODO Need to fix not going through 
        // const paymentResult = await stripe.confirmCardPayment(client_secret,{
        //     payment_method: {
        //         // CARD Element is a singleton like all stripe elements
        //         card: elements.getElement(CardElement),
        //         billing_details: {
        //             name: 'Brent Watch'
        //         }
        //     }
        // })

        // if(paymentResult.error)
        // {
        //     alert(paymentResult.error);
        // }
        // else
        // {
        //     if(paymentResult.paymentIntent.status === 'succeeded'){
        //         alert('Payment Successful');
        //     }
        // }


    }   

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment</h2>
                <CardElement/>
                <PaymentButton onClick={paymentHandler}>
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
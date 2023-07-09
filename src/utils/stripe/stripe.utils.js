import { loadStripe } from "@stripe/stripe-js"


// For Test purposes we will hard code the publish key to
// see if reason for the card component not loading 
// is due to the fact that the pubisheble key cant be found in the .env file
// export const stripePromise = loadStripe(
//     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
// );

 export const stripePromise = loadStripe("pk_test_51NRBAJFvASA8S8ybt3tvr7fi5zYhYGp8n83L9ighMTIyOGFRhchQmVu1owbdKTv4EphDEYdOQS1JVOJh3xRvmO7J000Nu254z8");

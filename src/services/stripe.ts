import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.SRIPE_API_KEY,
    {
        apiVersion:'2020-08-27',
        appInfo:{
            name:'ignwesErnandes',
            version:"0.1.0"
        }
}
)
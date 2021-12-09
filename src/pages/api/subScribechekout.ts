import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import {stripe} from "../../services/stripe";


export default  async(req: NextApiRequest, res: NextApiResponse ) => {
    if(req.method === 'POST'){
        const session = await getSession({ req })

        const stripeCostumer = await stripe.customers.create({
            email: session.user.email
        })


        const checkoutSession = await stripe.checkout.sessions.create({
            customer:stripeCostumer.id,
            payment_method_types:['card'],//tipos de pagamentos é opcional caso não passe aceita todos
            billing_address_collection:'required',
            line_items:[
                {price:'price_1K3JMrDl0KI1rzQyll8fyg6Y', quantity: 1 },
            ],
            mode:'subscription',
            allow_promotion_codes: true,
            success_url:process.env.STRIPE_SUCCESS_URL,
            cancel_url:process.env.STRIPE_CANCEL_URL,
        })
            res.status(200).json({sessionId: checkoutSession.id})
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }

}
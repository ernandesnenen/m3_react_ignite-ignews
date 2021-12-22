import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../services/api'

import { getStripeJs } from '../../services/stripe-js'
import styles from './subScribe.module.scss'

interface SubScribeButtonProsps{
    priceId:string
}

export function SubScribeButton({priceId}: SubScribeButtonProsps){
    const { data: session } = useSession()
    const router = useRouter()

  


async function handleSubscribe(){
    console.log(session.activeSubscription)
    if(!session){
        signIn('github')
        return
    }


    if(session.activeSubscription){
        router.push('/posts')
        return
    }

try {
    
    const res = await api.post('/subScribechekout')
    const {sessionId} = res.data
    const stripeJs = await getStripeJs()
    stripeJs.redirectToCheckout({sessionId})

} catch (error) {
    alert(error)
}
    

}
// --------------------------------------------------------------------
    return(
        <button 
        type='button'
        className={styles.subScribe}
        onClick={handleSubscribe}>
            Subscribe Now
        </button>
    )
}
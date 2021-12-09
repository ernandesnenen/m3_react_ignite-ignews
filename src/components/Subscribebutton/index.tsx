import { useSession, signIn } from 'next-auth/react'
import styles from './subScribe.module.scss'

export function SubScribeButton(){
    const { data: session } = useSession()


function handleSubscribe(){
    if(!session){
        signIn('github')
        return
    }

}
// --------------------------------------------------------------------
    return(
        <button 
        type='button'
        className={styles.subScribe}>
            Subscribe Now
        </button>
    )
}
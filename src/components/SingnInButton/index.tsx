import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"

export function SingniInbutton(){
    const { data: session } = useSession()
   
    return session ? (
        <button
         type="button"
        className={styles.signInButton}
        onClick={ ()=>signOut()}
        >
            <FaGithub color="#04d361"/>
            <span>{session.user.name}</span>
            <FiX color="#737380" className={styles.closeIcon}/>
            
        </button>
    ):(
        <button
        type="button"
       className={styles.signInButton}
       onClick={ () => signIn('github')}
       >
           <FaGithub color="#eba417"/>
           Sing with GitHub
           
       </button>
    )
}
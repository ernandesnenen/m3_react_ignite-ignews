import styles from './subScribe.module.scss'

export function SubScribeButton(){
    return(
        <button 
        type='button'
        className={styles.subScribe}>
            Subscribe Now
        </button>
    )
}
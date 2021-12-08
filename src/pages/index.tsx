
import{GetStaticProps} from 'next'
import  Head  from 'next/head'
import { SubScribeButton } from '../components/Subscribebutton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product:{
    priceId:string,
    amount:number
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
    <Head>
      <title>Home page</title>
    </Head>
    <main className={styles.contentContainer} >
      <section className={styles.hero}>
        <span>👏Hey, welcome</span>
        <h1>News about the <span>React </span>world</h1>
        <p>
          Get access to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubScribeButton />
      </section>
      <img src="/images/avatar.svg" alt="avatar mulher trabalhando em seu notebook"/>
    </main>
  
    
  </>
  )
}

export const getStaticProps: GetStaticProps = async() =>{
  const price = await stripe.prices.retrieve('price_1K3JMrDl0KI1rzQyll8fyg6Y')

  const product = {
    priceId: price.id,
    amount: price.unit_amount/100
  }
  return{
    props:{
      product
    },
    revalidate: 60*60*24 // 24horas
  }

}
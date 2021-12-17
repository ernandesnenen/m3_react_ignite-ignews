import { Client } from '../../../utils/prismicHelpers'
import { homePageQuery } from '../../../utils/queries'
import Prismic from '@prismicio/client'





import  Head  from 'next/head'
import styles from './styles.module.scss'


export default function Posts(){
    return(
        <>
        <Head>
            <title>Post | Ignews</title>  
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a>
                    <time>12 de maio 2021</time>
                    <strong>xxxxxxxxxxxxxxxxxxxxxxx</strong>
                    <p>pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
                </a>
                <a>
                    <time>12 de maio 2021</time>
                    <strong>xxxxxxxxxxxxxxxxxxxxxxx</strong>
                    <p>pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
                </a>
                <a>
                    <time>12 de maio 2021</time>
                    <strong>xxxxxxxxxxxxxxxxxxxxxxx</strong>
                    <p>pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
                </a>
            </div>
        </main>
     
        </>
    )
}
export async function   getStaticProps () {     

    // const posts = await homePageQuery()
    // const posts = await Client().query('', { pageSize: 100, lang: '*' });
    const posts = await Client().query(Prismic.Predicates.at("document.type", "post"))

console.log(JSON.stringify(posts, null, 2))
  
    return  {
    
        props: { posts }
    
    }
  }
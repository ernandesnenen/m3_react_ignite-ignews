// import { Client } from '../../../utils/prismicHelpers'
import Link from 'next/link'
import * as prismic from '@prismicio/client'


import {createClient, repositoryName } from '../../../prismicio'

// import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'



import  Head  from 'next/head'
import styles from './styles.module.scss'

type Post = {
    slug: string;
    title:string;
    excerpt: string;
    updatedAt: string
}

interface PostsPros{
   posts: Post[]
}



export default function Posts({posts}:PostsPros){
    
    return(
        <>
        <Head>
            <title>Post | Ignews</title>  
        </Head>
         <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post=>(
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <a key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>
                ))}
            </div>
        </main> 
     
        </>
    )
}
// export async function   getStaticProps () {     

//     // const posts = await homePageQuery()
//     // const posts = await Client().query('', { pageSize: 100, lang: '*' });
//     const response = await Client().query(Prismic.Predicates.at("document.type", "post"))

// // console.log(JSON.stringify(posts, null, 2))
// const posts = response.results.map(post =>{
//     return{
//         slug: post.uid,
//         title: RichText.asText(post.data.title),
//         excerpt: post.data.content.find(content => content.type === 'paragraph')?.text??'',
//         updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br',{
//             day: '2-digit',
//             month:'long',
//             year: 'numeric'
//         })
//     }
// })
  
//     return  {
    
//         props: { posts }
    
//     }
//   }
export async function getStaticProps() {
    
    const client = createClient()   
  
  
    const response = await client.getAllByType('post')
    
    const posts = response.map(post =>{
        return{
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text??'',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br',{
                day: '2-digit',
                month:'long',
                year: 'numeric'
            })
        }
    })
   
  
    return {
      props: { posts }, // Will be passed to the page component as props
    }
  }
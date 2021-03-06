import {  GetStaticProps, GetStaticPaths } from "next"
import Link from "next/link"

import {RichText} from 'prismic-dom'
import stylespost from '../stylespost.module.scss'

import  Head from 'next/head'
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { createClient } from "../../../../prismicio"


interface PreviewPostProps{
    post:{
    slug: string;
    title:string;
    content: string;
    updatedAt: string }
}


export default function PreviewPost({post}:PreviewPostProps){
    const{ data: session }= useSession()
   

    const router = useRouter()

    useEffect(()=>{
        if(session?.activeSubscription) {
            router.push(`/posts}`)
        }

        {console.log('chegou aqui')}

    },[session])

return(
    <>
    <Head>
        <title>{post.title} | ignews</title>
    </Head>
    <main className={stylespost.container}> 
        <article className={stylespost.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div
             className={`${stylespost.content} ${stylespost.previewcontent}`} 
             dangerouslySetInnerHTML={{__html: post.content}}/>
             <div className={stylespost.continueReading}>
                 Wanna Continue Reading 
                 <Link href='/'>
                    <a>Subscriptio now 🥰</a>
                 </Link>

             </div>

        </article>
    </main>
    
    </>
)
}

export const getStaticPaths: GetStaticPaths = async()=>{
return{
    paths:[
       { params:{slug:"obtendo-o-status-de-progresso-do-envio-de-dados-com-axios"}}
    ],
    fallback: 'blocking'
}
}


export const getStaticProps: GetStaticProps = async ({params})=>{
    
    const { slug } = params
    console.log('slug',slug)
    
    const client = createClient()
    const response = await client.getByUID('post', String(slug))
    // const response = await Client().getByUID('post', String(slug),{})
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asText(response.data.content.splice(0, 3)),        
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br',{
            day: '2-digit',
            month:'long',
            year: 'numeric'
        })
    }
    
    return{
   
    props :{
       post,
    },
    revalidate: 60 * 60
}


}
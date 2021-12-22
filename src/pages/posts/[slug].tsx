import { GetServerSideProps } from "next"
import { getSession} from "next-auth/react"
import { Client } from '../../../utils/prismicHelpers'
import {RichText} from 'prismic-dom'

import  Head from 'next/head'


interface PostProps{
    post:{
    slug: string;
    title:string;
    content: string;
    updatedAt: string }
}


export default function Post({post}:PostProps){
return(
    <>
    <Head>
        <title>{post.title} | ignews</title>
    </Head>
    <main>
        <article>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.content}}/>

        </article>
    </main>
    
    </>
)
}

export const getServerSideProps : GetServerSideProps = async ({req, params})=>{
    const session = await getSession({req})
    const { slug } = params

    const response = await Client(req).getByUID('post', String(slug),{})
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asText(response.data.content),        
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br',{
            day: '2-digit',
            month:'long',
            year: 'numeric'
        })
    }
    
    return{
   
    props :{
       post,
    }
}


}
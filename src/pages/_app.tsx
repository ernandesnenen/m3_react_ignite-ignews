import {AppProps} from 'next/app'
import '../../styles/global.scss'
import { Header } from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../../prismicio'
import Link from 'next/link'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
 

  return(
    <PrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={({ href, children, ...props }) => (
      <Link href={href}>
        <a {...props}>
          {children}
        </a>
      </Link>
    )}
  >
      <PrismicPreview repositoryName={repositoryName}>
        <SessionProvider session={session}>
        <Header/>
        <Component {...pageProps} />
        </SessionProvider>
      </PrismicPreview>
  </PrismicProvider>
     )
 
}

export default MyApp

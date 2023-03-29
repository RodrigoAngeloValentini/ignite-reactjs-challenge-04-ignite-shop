import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ProductsContainer, SucessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string
  productsImage: string[]
}

export default function Sucess({ customerName, productsImage }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <SucessContainer>
        <ProductsContainer>
          {productsImage.map((image, i) => {
            return (
              <ImageContainer key={i}>        
                <Image src={image} width={120} height={122} alt={customerName} />
              </ImageContainer>
            )
          })}
        </ProductsContainer>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de <strong>{productsImage.length} camisetas</strong> está com total sucesso a caminho de sua casa!
        </p>
        <Link href={'/'}>
          Voltar ao catálogo
        </Link>
      </SucessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  
  const customerName = session.customer_details?.name
  const productsImage = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImage,
    }
  }
} 
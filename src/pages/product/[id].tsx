import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import Stripe from "stripe"
import { Skeleton } from "../../components/Skeleton"
import { Product as ProductData } from "../../contexts/CartContext"
import { useCart } from "../../hooks/useCart"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails, SkeletonContainer } from "../../styles/pages/product"
import { formattedMoney } from "../../utils/formatter"

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    priceId: string
  }
}

export default function Product({ product }: ProductProps) {

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  const { isFallback } = useRouter()

  function handleAddItemToCart(item: ProductData ) {
    const check = checkIfItemAlreadyExists(item.id)
    if (check) {
      return toast.info('Produto já na sacola')
    }

    toast.success('Produto adicionado na sacola!')

    addToCart(item)  
  }

  if (isFallback) {
    return (
      <SkeletonContainer>
        <Skeleton />
      </SkeletonContainer>
    )
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='Foto do produto' />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formattedMoney(product.price / 100)}</span>
          <p>{product.description}</p>
          <p>Criada no Brasil e feita pro mundo, todos nossos produtos são feitos sob demanda para você usando tecnologia de ponta na estamparia. Qualidade garantida pela Reserva INK.</p>
          <button onClick={() => {
            handleAddItemToCart(product)
          }}>
            Colocar na sacola
          </button>
      </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  if(!params) {
    return {
      notFound: true // Caso não exista parametros, retorna um 404
    }
  }

  const productId = params.id 

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
  
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: price.unit_amount,
        priceId: price.id
      },
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
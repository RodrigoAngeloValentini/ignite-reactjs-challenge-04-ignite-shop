import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { GetStaticProps } from "next"

import 'keen-slider/keen-slider.min.css'
import {useKeenSlider}  from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import Stripe from "stripe"

import { formattedMoney } from "../utils/formatter"

import { HomeContainer, ProductContainer } from "../styles/pages/home"
import { Handbag } from "phosphor-react"
import { Product } from "../contexts/CartContext"
import { useCart } from "../hooks/useCart"
import { toast } from "react-toastify"

interface HomeProps {
  products: Product[]
}

export default function Home({products}: HomeProps) {

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 2.3,
      spacing: 48,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1.1,
          spacing: 20,
        }
      },
    },
  })

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  function handleAddItemToCart(item: Product) {
    const check = checkIfItemAlreadyExists(item.id)
    if (check) {
      return toast.info('Produto já está na sacola')
    }

    addToCart(item)

    toast.success('Produto adicionado na sacola!', {
      pauseOnFocusLoss: false
    })
}

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
              <ProductContainer key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <span>
                  {product.name}
                  </span>
                  <strong>{formattedMoney(product.price / 100)}</strong>
                </div>
                <button onClick={() => {
                  handleAddItemToCart(product)
                }}>
                  <Handbag size={24} color='#fff' />
                </button>
              </footer>
            </ProductContainer>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: price.unit_amount,
      priceId: price.id,
    }
  })
  
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 / 2
  }
}

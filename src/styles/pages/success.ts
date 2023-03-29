import { styled } from "..";

export const SucessContainer = styled('main', {
  height: 550,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: '0 auto',

  h1: {
    marginTop: 48
  },

  p: {
    maxWidth: 550,
    marginTop: 24,

    fontSize: 18,
    textAlign: "center",
    lineHeight: '1.6',

    color: '$gray300'
  },

  a: {
    marginTop: 75,

    fontSize: '$xl',
    color: '$green300',
    textDecoration: "none",
    fontWeight: "bold",
    transition: 'color 0.15s',

    '&:hover': {
      color: '$green500',
    }
  },
})

export const ImageContainer = styled('div', {
  width: 130,
  position: "relative", 
  height: 130,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',

  img: {
    objectFit: "cover",
  }
})

export const ProductsContainer = styled('div', {
  width: '100%',
  position: 'relative', 
  display: "flex",
  alignItems: "center",
  justifyContent:"center",

  'div + div': {
    marginLeft: -45,
    boxShadow: '2px 0px 40px #000',
  }
})
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: "flex",
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 580,

  '@lg': {
    paddingLeft: '1rem',
  },

  '@xl': {
    minHeight: 'calc(100vh - 120px)',
    paddingBottom: '1rem'
  }
})

export const ProductContainer = styled('div', {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: '0.25rem',
  position: "relative",

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: "pointer",
  overflow: "hidden",

  'img': {
    objectFit: "cover",
  },

  'footer': {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    position: "absolute",
    bottom: 0,
    width: '100%',
    height: 98,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    background: '$gray800',

    'div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 6,

      'span': {
        color: '$gray100',
        fontSize: '$md'
      },
  
      'strong': {
        color: '$green300',
        fontSize: '$xl'
      }
    },

    'button': {
      background: '$green500',
      border: 0,
      borderRadius: 6,
      padding: '0.6rem 0.75rem',
      transition: 'all 0.15s',
      cursor: 'pointer',

      '&:hover': {
        background: '$green300',
      }
    }

  },

  '&:hover': {
    'footer': {
      transform: 'translateY(0)',
      opacity: 1
    },

    '@md': {
      footer: {
        opacity: 0,
      }
    }
  }
})
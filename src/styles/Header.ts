import { styled } from "@stitches/react";

export const HeaderContainer = styled('header', {
  padding: '2rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  button: {
    position: 'relative',
    padding: '0.7rem 0.8rem',
    border: 0,
    borderRadius: 8,

    background: "$gray800",
    cursor: "pointer",

    span: {
      position: 'absolute',
      top: -10,
      right: -7,
      height: 22,
      width: 22,

      background: '$green500',
      boxShadow: '0 0 0 5px #121214',

      color: '$gray100',

      display: 'flex',
      alignItems: "center",
      justifyContent: "center",

      borderRadius: '50%',

    }
  }
})
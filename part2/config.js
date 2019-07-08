'use strict'

import styled from '@emotion/styled'

const Big = styled.div({
  fontSize: '7vh'
})

const Center = styled.div({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})

const BaseSlide = styled.div({
  padding: '2rem'
})

const BigTitle = styled.h1({
  color: '#669F64 !important',
  fontSize: '10rem !important',
  borderBottom: 'none',
  textShadow: '-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 0px 0px 8px rgba(0,0,0,0.16)'
})

const GreenSlide = styled.div({
  background: '#fff',
  color: '#333333',
  h1: {
    color: '#669F64'
  },
  h2: { color: '#669F64' },
  h3: {
    color: '#669F64'
  },
  h4: { color: '#669F64' },
  h5: { color: '#669F64' },
  h6: { color: '#669F64' },
})

const theme = {
  colors: {
    text: '#333333',
    background: '#fff',
    link: '#07c',
    pre: '#f0f',
    preBackground: '#fff',
    code: '#f0f',
  },
  googleFont: 'https://fonts.googleapis.com/css?family=Oswald:300,600,900|Raleway:400,700&display=swap',
  font: '"Oswald", sans-serif',
  monospace: 'Menlo, monospace',
  css: {
    textAlign: 'left',
    fontSize: '1.5em',
    '@media screen and (min-width:56em)': {
      fontSize: '2em',
    },
    '@media screen and (min-width:64em)': {
      fontSize: '3em',
    },
    '@media print': {
      fontSize: '2.5em',
    },
    'li > p': {
      margin: 0,
    },
    em: {
      color: '#e61a7a',
      fontStyle: 'normal'
    }
  },
  heading: {
    fontFamily: '"Oswald", sans-serif',
    fontWeight: 900,
    margin: '0',
    color: '#669F64',
    textTransform: 'uppercase'
  },
  h1: {
    fontSize: '3rem',
    borderBottom: '4px solid #669F64'
  },
  h2: { fontSize: '3.5rem' },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
    //color: '#546e7a'
  },
  h4: { fontSize: '1.3em' },
  h5: { fontSize: '1.2em' },
  h6: { fontSize: '1.1em' },
  pre: {
    textAlign: 'left',
    color: '#546e7a'
  },
  code: { color: '#546e7a' },
  ol: {
    textAlign: 'left',
    marginLeft: 20
  },
  ul: {
    textAlign: 'left',
    marginLeft: 20
  },
  li: {
    margin: '20px 0'
  },
  Slide: {
    '& > div': {
      width: '100vw',
      height: '100vh',
      margin: 'auto 5vw'
    }
  }
}

export { theme, Big, Center, BaseSlide, GreenSlide, BigTitle }

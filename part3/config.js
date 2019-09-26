'use strict'

import styled from '@emotion/styled'

const BaseSlide = styled.div({
  padding: '2rem',
  fontSize: '4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

const BigFont = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  '> h1': {
    fontSize: '17rem',
    borderBottom: 'none',
    display: 'block',
    marginBottom: 0,
    lineHeight: '17rem'
  },
  '> .subtitle': {
    fontSize: '17rem',
    borderBottom: 'none',
    display: 'block',
    color: '#000'
  },
  '> pre': {
    fontSize: '7rem',
    color: '#000'
  },
  '> .colored': {
    color: '#669F64',
    fontSize: '17rem',
  },
  'img': {
    maxHeight: '90vh'
  }
})

const CenteredImages = styled.div({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: 'auto auto auto auto',
  textAlign: 'center',
  '> .avatar': {
    '> h6': {
      fontSize: '1rem',
      margin: 0
    },
    '> img': {
      maxWidth: 220
    }
  }
});

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
    color: '#669F64',
    textTransform: 'uppercase',
    paddingTop: 0
  },
  h1: {
    fontSize: '3rem',
    borderBottom: '4px solid #669F64',
    marginTop: 0
  },
  h2: { fontSize: '2.8rem' },
  h3: {
    fontSize: '2rem',
    fontWeight: 600
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
    }
  }
}

export { theme, CenteredImages, BaseSlide, BigFont }

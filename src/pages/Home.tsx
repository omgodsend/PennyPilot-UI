import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { Center, Text } from '@mantine/core'

const Home = () => {
  const token = jwtDecode(sessionStorage.getItem("token")|| '')
  return (
    <>
      <Center ml={300}><Text size='9' >Hello {token.name}</Text></Center>
    </>

  )
}


export default Home
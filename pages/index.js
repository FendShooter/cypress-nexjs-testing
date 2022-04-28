import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3004/movies')
        const data = await response.json()
        console.log(response)
        if (response.status !== 200) {
          console.log(response.status)
          setError(response.status)
        } else {
          setMovies(data.slice(0, 5))
        }
      } catch (error) {
        console.log('eer', error.message)
        setError(error.message)
      }
    } // * kkkk
    fetchData()
  }, [])
  if (error) {
    return (
      <p
        style={{
          color: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '626px',
        }}
        data-cy="show-error"
      >
        {error}
      </p>
    )
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {movies &&
          movies.map((movie) => (
            <div data-cy="movie-board" key={movie.title}>
              {movie.title}
            </div>
          ))}
      </div>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  )
}
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3004/movies')
//   const data = await response.json()
//   return {
//     props: {
//       data,
//     },
//   }
// }
export default Home

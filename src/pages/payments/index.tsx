'use client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const PaymentsPage: NextPage = () => {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('https://intelliverseai.com/wp/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((posts) => {
        const promises = posts.map((post: any) => {
          return fetch(`https://intelliverseai.com/wp/wp-json/wp/v2/media/${post.featured_media}`)
            .then((response) => response.json())
            .then((media) => {
              post.featured_image_url = media.source_url
              return post
            })
        })
        return Promise.all(promises)
      })
      .then((posts: any[]) => {
        setPosts(posts)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <main className="overflow-x-hidden">
      <h1>hello World</h1>
    </main>
  )
}

export default PaymentsPage

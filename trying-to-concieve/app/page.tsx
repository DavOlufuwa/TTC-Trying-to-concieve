import { getAllPosts, getPostBySlug } from '@/sanity/sanityUtils'
import React from 'react'

const page = async () => {
  const posts = await getAllPosts()
  const singlePost = await getPostBySlug("the-joy-of-living");
  return (
    <div>Parley</div>
  )
}

export default page

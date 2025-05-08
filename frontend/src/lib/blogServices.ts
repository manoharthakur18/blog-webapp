import axiosClient from "./axiosClient"


export const fetchPosts = async () => {
  const response = await axiosClient.get('/posts')
  return response.data
}

export const fetchPostBySlug = async (slug: string) => {
  const response = await axiosClient.get(`/posts/${slug}`)
  return response.data
}

export const createPost = async (data: FormData) => {
  const response = await axiosClient.post('/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const updatePost = async (slug: string, data: FormData) => {
  const response = await axiosClient.put(`/posts/${slug}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deletePost = async (slug: string) => {
  const response = await axiosClient.delete(`/posts/${slug}`)
  return response.data
}

export const submitComment = async (postId: number ,data: { author: string; text: string }) => {
  const response = await axiosClient.post(`/comments/${postId}`, data)
  return response.data
}


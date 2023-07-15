export const postRouter = {
  post: '/post',
  create: '/create',
  like: (postId: string) => `/like/:${postId}`,
  comment: (postId: string) => `/comment/:${postId}`,
} as const;

export const idParamNames = {
  postId: 'postId',
} as const;

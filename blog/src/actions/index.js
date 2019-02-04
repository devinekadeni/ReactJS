import _, { memoize, map, uniq, chain } from 'lodash'

import jsonPlaceholder from '../apis/jsonPlaceholder'

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts')

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`)

  dispatch({ type: 'FETCH_USER', payload: response.data })
}

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  /* Alternate of below code */
  // const userIds = uniq(map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)))

  /* Alternate of above code */
  _.chain(getState().posts)
    .map('userId')    // take only userId key and value
    .uniq()           // take the unique one
    .forEach(id => dispatch(fetchUser(id)))
    .value()          // same meanings as execute()
}

/* MEMOIZE - LODASH --> alternate of fetchPostsAndUsers */
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch)

// /* Memoize: make the function parameter unique to be hit */
// /* fetching jsonPlaceholder will be hit only if the param id is unique */
// const _fetchUser = memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })
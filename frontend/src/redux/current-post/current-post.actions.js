export function setCurrentPost(post) {
  return {
    type: 'SET_CURRENT_POST',
    payload: post,
  };
}

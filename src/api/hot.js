import require from '@/utils/require'

export function getTopList(oParams) {
  return require.get('/top/list', {
    params: oParams.params
  })
}

///playlist/hot


export function getTopListHot(oParams) {
  return require.get('/personalized/newsong', {
    params: oParams.params
  })
}

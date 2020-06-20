import require from '@/utils/require'

export function getArtists(oParams) {
  return require.get('/artist/desc', {
    params: oParams.params
  })
}




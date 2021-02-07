export default (httpClient) => ({
  getMe: async () => {
    const { data } = await httpClient.get('/users/me')

    return data
  },
})

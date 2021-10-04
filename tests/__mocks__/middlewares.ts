export const middleware1 = async (req, res, next) => {
  console.log('Middleware 1')
  next()
}

export const middleware2 = async (req, res, next) => {
  console.log('Middleware 2')
  next()
}
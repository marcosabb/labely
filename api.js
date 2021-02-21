const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const { db } = router

server.put('/repositories/:userId/:repositoryId', (req, res) => {
  const { params, body } = req
  const { userId, repositoryId } = params

  const table = db.get('repositories')

  table
    .getById(userId)
    .get('repositories')
    .getById(repositoryId)
    .assign(body)
    .write()

  res.sendStatus(200)
})

server.use(router)
server.listen(3000, () => {
  console.log('http://localhost:3000')
})

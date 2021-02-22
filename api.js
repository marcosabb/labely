const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const { db } = router

server.get('/repositories/:userId', (req, res) => {
  const { params, query } = req
  const { userId } = params
  const { name, labels } = query

  const table = db.get('repositories')
  const repositories = table.getById(userId).get('repositories').value()

  if (name) {
    const data = repositories.filter(
      (repository) => repository.name.toLowerCase() === name.toLowerCase()
    )

    return res.status(200).json(data)
  }

  if (labels) {
    const data = repositories.filter((repository) => {
      const repositoryLabels = repository.labels.map((label) =>
        label.toLowerCase()
      )

      return repositoryLabels.some((element) =>
        labels.includes(labels.split(',').map((label) => label.toLowerCase()))
      )
    })

    return res.status(200).json(data)
  }

  return res.status(200).json(repositories)
})

server.put('/repositories/:userId/:repositoryId', (req, res) => {
  const { params, body } = req
  const { userId, repositoryId } = params

  const table = db.get('repositories')

  const repository = table
    .getById(userId)
    .get('repositories')
    .getById(repositoryId)
    .assign(body)
    .write()

  res.status(200).json(repository)
})

server.use(router)
server.listen(3000, () => {
  console.log('http://localhost:3000')
})

const jsonServer = require('json-server')
const server = jsonServer.create()
const _ = require('lodash')
const router = jsonServer.router('./api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/repositories', (req, res) => {
  const db = router.db
  console.log('chegou aqui 1')
  if (Array.isArray(req.body)) {
    console.log('chegou aqui 2')

    req.body.forEach((element) => {
      insert(db, 'repositories', element)
    })
  } else {
    insert(db, 'repositories', req.body)
  }

  res.sendStatus(200)

  function insert(db, collection, data) {
    const table = db.get(collection)

    if (_.isEmpty(table.find({ _id: data._id }).value())) {
      table.push(data).write()
    } else {
      table
        .find({ _id: data._id })
        .assign(_.omit(data, ['_id']))
        .write()
    }
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('http://localhost:3000')
})

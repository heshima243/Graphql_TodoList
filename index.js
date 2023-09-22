import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./graphql/schema.js"
import resolvers from "./graphql/resolvers.js"


const app = express()

app.use(express.static('public'))

app.use("/graphql",graphqlHTTP({
  schema : schema,
  rootValue : resolvers,
  graphiql : true
}))

app.listen(8085, console.log('port listen on 8085'))
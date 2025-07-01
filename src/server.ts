import { schema } from './schema'
import { type Context, createContext } from './context'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'

const start = async () => {
    const server = new ApolloServer<Context>({ schema })

    const { url } = await startStandaloneServer(server, {
        context: createContext,
        listen: { port: 4000 },
    })

    console.log(`\
  🚀 Server ready at: ${url}
  `)
}

start()

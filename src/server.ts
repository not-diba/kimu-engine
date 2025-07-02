import fs from 'fs'
import path from 'path'
import { schema } from './schema'
import { type Context, createContext } from './context'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer, type ApolloServerPlugin } from '@apollo/server'


const logging: ApolloServerPlugin<Context> = {
    async requestDidStart(requestContext) {
        const now = new Date().toLocaleString('en-KE', {
            timeZone: 'Africa/Nairobi'
        });
        const date = new Date(now);
        const nairobiTime = date.toDateString() + ' ' +
            date.getMinutes().toString().padStart(2, '0') + ':' +
            date.getHours().toString().padStart(2, '0') + ':' +
            date.getSeconds().toString().padStart(2, '0');

        const logPath = path.join(__dirname, './logs/development.log');
        const operationName = requestContext.request.operationName ?? 'AnonymousOperation';
        if (operationName === 'IntrospectionQuery') return;
        const variables = JSON.stringify(requestContext.request.variables ?? {}, null, 2);
        const query = requestContext.request.query ?? '';
        const requestLog = `[${nairobiTime}] Request: ${operationName}\nQuery:\n${query}\nVariables:\n${variables}\n`;
        fs.appendFileSync(logPath, requestLog);

        return {
            async didEncounterErrors(requestContext) {
                const messages = requestContext.errors.map((err) => err.message).join('; ');
                const errorMessage = `[${nairobiTime}] Errors: ${messages}\n`;
                fs.appendFileSync(logPath, errorMessage);
            },
        };
    },
};

const start = async () => {
    const server = new ApolloServer<Context>({
        schema,
        plugins: [logging],
    })

    const { url } = await startStandaloneServer(server, {
        context: createContext,
        listen: { port: 4000 },
    })

    console.log(`\
  🚀 Server ready at: ${url}
  `)
}

start()

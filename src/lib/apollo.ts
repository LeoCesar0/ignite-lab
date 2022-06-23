import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4ouovs8125j01ywdsx36sra/master',
    cache: new InMemoryCache()
})
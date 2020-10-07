import path from 'path'

import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const schemaDir = path.resolve() + '/src/server/typedefs/schema'
const loadedFiles = loadFilesSync(`${schemaDir}/*.graphql`)
const typeDefs = mergeTypeDefs(loadedFiles)

export default typeDefs

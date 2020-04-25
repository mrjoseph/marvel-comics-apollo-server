import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
  Query: {
    characters: async (source: void, args, { dataSources }): Promise<object> => {
      return await dataSources.personalizationAPI.getCharacters(args)
    },
    search: async (source: void, args, { dataSources }): Promise<object> => {
      return await dataSources.personalizationAPI.search(args)
    },
    character: async (source: void, { id }, { dataSources }): Promise<object> => {
      return await dataSources.personalizationAPI.getCharacter(id)
    },
  },
};

export default resolverMap;
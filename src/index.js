import 'dotenv/config';
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient ({
  uri: 'https://acs-ci-svcs.eastus.cloudapp.azure.com/scarif/api/v1/graphql',
  request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${process.env.ACS_TOKEN}`
        }
      });
  },
});

const GET_ORGANIZATION = gql`
query GetOrg {
  organization(orgId: "81c7a0ec-fe56-e911-b047-00155d961952") {
    id,
    name: tenantName,
    sites {
      siteName
    }
  }
}
`;

function GetOrg() {
  client.query({
     query: GET_ORGANIZATION,
     fetchPolicy: 'network-only'
  }).then(console.log)
};

// calling the method
GetOrg();





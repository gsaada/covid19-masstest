
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'

console.log(awsconfig)
Amplify.configure(awsconfig)

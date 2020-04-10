require('dotenv').config()
import '../db/connection'
import { generateUsers } from '../generators/users-generator'

const generate = async (): Promise<void> => {
  try {
    await generateUsers()
    console.log('Finished generating users.')
  } catch (error) {
    console.error('Could not generate users.', error)
  }
}

generate()

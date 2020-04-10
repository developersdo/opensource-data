require('dotenv').config()
import '../db/connection'
import { generateUsers } from '../generators/users-generator'
import { generateIndex } from '../generators/index-generator'

const generate = async (): Promise<void> => {
  try {
    await generateUsers()
    await generateIndex()
    console.log('Finished generating users.')
  } catch (error) {
    console.error('Could not generate users.', error)
  }
}

generate()

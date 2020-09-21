import dotenv = require('dotenv')
dotenv.config()

import { argv } from 'yargs'

import '../db/connection'

import { scrapeUsers } from '../scraper/users-scraper'
import { scrapeRepos } from '../scraper/repos-scraper'

const scrape = async (): Promise<void> => {
  try {
    if (!argv.only || (argv.only && argv.only === 'users')) {
      await scrapeUsers()
      console.log('Finished scraping users.')
    }

    if (!argv.only || (argv.only && argv.only === 'repos')) {
      await scrapeRepos()
      console.log('Finished scraping repos.')
    }
  } catch (error) {
    console.error('An error ocurred while scraping data.', error)
  }
}

scrape()

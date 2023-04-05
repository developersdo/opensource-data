import dotenv = require('dotenv')
dotenv.config()

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import '../db/connection'

import { scrapeUsers } from '../scraper/users-scraper'
import { scrapeRepos } from '../scraper/repos-scraper'

const argv = yargs(hideBin(process.argv)).argv

const scrape = async (): Promise<void> => {
  try {
    const scrapeAll = !('only' in argv)
    const scrapeOnlyUsers = 'only' in argv && (!argv.only || (argv.only && argv.only === 'users'))
    if (scrapeAll && scrapeOnlyUsers) {
      await scrapeUsers()
      console.log('Finished scraping users.')
    }

    const scrapeOnlyRepos = 'only' in argv && (!argv.only || (argv.only && argv.only === 'repos'))
    if (scrapeAll && scrapeOnlyRepos) {
      await scrapeRepos()
      console.log('Finished scraping repos.')
    }
  } catch (error) {
    console.error('An error ocurred while scraping data.', error)
  }
}

scrape()

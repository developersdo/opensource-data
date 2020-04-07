require('dotenv').config()
import '../db/connection'

import { usersScraper } from '../scraper/users-scraper'

const scrape = async (): Promise<void> => {
  try {
    await usersScraper.scrapeAll()
    console.log('Finished scraping users.')
  } catch (error) {
    console.error('Could not scrape users.', error)
  }
}

scrape()

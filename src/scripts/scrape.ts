require('dotenv').config()
import '../db/connection'

import { scrapeUsers } from '../scraper/users-scraper'

const scrape = async (): Promise<void> => {
  try {
    await scrapeUsers()
    console.log('Finished scraping users.')
  } catch (error) {
    console.error('Could not scrape users.', error)
  }
}

scrape()

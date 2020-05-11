import { Model } from 'sequelize'

export class Repo extends Model {
  id!: number
  originalId!: string
  name!: string
  description!: string
  homepageUrl!: string
  url!: string
  languages!: string
  stargazers!: number
  watchers!: number
  forks!: number
  createdAt!: Date
  scrapedAt!: Date
}

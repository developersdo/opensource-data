import { Model } from 'sequelize'

export class User extends Model {
  id!: number
  originalId!: string
  login!: string
  name!: string
  type!: string
  url!: string
  avatarUrl!: string
  company!: string
  location!: string
  createdAt!: Date
  scrapedAt!: Date
  followers!: number
  following!: number
  sources!: number
  forked!: number
  collaborations!: number
}

import fs from 'fs'
import path from 'path'

const [, , suffix] = process.argv
const getCurrentDateWithDashes = (): string =>
  new Date()
    .toISOString()
    .split('.')[0]
    .replace(/[^\d]+/g, '-')

const templatePath = path.join(__dirname, 'templates', 'new-migration.ts')
const newMigrationPath = path.join(
  __dirname,
  '..',
  'db',
  'migrations',
  `${getCurrentDateWithDashes()}-${suffix}.ts`
)
fs.createReadStream(templatePath).pipe(fs.createWriteStream(newMigrationPath))

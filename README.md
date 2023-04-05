# Opensource Data

Data source for [opensource frontend](https://developersdo.github.com/opensource). This repo **[scrape data hourly](https://github.com/developersdo/opensource-data/actions)** and **[publish it as JSON files](https://developersdo.github.io/opensource-data/)**.

## Usage

Data sources are available at: [developersdo.github.io/opensource-data](https://developersdo.github.io/opensource-data).

## Development

You will need to:

1.  Clone this repo.
2.  Install dependencies: `npm i`
3.  Run migrations: `npm run migrations:run`
4.  Copy `.env.default` to `.env`.
5.  [Create a personal GitHub access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) (with no scopes) and add the value to `OSD_GH_TOKEN` in your `.env`.
    - <small>Note: You can skip that if you don't need to run the scraper locally.</small>

## Scripts

| Script                           | Description                          |
| -------------------------------- | ------------------------------------ |
| `npm run migrations:run`         | Run all migrations.                  |
| `npm run migrations:add [name]`  | Add a new migration.                 |
| `npm run scrape`                 | Scrape all data.                     |
| `npm run scrape -- --only=users` | Scrape users data only.              |
| `npm run scrape -- --only=repos` | Scrape repos data only.              |
| `npm run generate`               | Generate public site and JSON files. |

## Debugging

Prepend any commmand with `DEBUG=osd:*`. For example:

```sh
DEBUG=osd:* npm run scrape
```

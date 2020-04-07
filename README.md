# Opensource Data

Data source for [developersdo.github.com/opensource](https://developersdo.github.com/opensource)

## Development

You will need to:

1.  Clone this repo.
2.  Install dependencies with: `npm i`
3.  [Run migrations](#running-migrations)
4.  Copy [.env.default](.env.default) file to `.env`.
5.  [Create a personal GitHub access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) and add the value to `GH_TOKEN`. Don't check any scope.

### Running migrations

```sh
npm run migrations:run
```

### Adding new migrations

```sh
npm run migrations:add [new-migration-name]
```

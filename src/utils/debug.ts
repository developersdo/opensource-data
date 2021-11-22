import path from 'path'
import debug from 'debug'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDebug = (filename: string) => (...data: any[]): void => {
  const srcPath = path.join(__dirname, '..')
  const debugPath = path.relative(srcPath, filename).replace(path.sep, ':')
  const debugLogger = debug(`osd:${debugPath}`)
  debugLogger('→', ...data)
}

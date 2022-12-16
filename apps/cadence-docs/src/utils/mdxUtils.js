import fs from 'fs'
import path from 'path'

export const PAGE_PATH = path.join(process.cwd(), 'src/docs/pages')
export const COMPONENT_PATH = path.join(process.cwd(), 'src/docs/components')

export const pagePaths = fs.readdirSync(PAGE_PATH).filter((path) => /\.mdx?$/.test(path))
export const componentPaths = fs.readdirSync(COMPONENT_PATH).filter((path) => /\.mdx?$/.test(path))
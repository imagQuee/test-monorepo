import { camelCase, snakeCase } from 'lodash'

/**
 * Transform objectKey to snake case
 * @param obj
 * @returns
 */
export const snakeCaseKeys: any = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return obj
  if (Array.isArray(obj)) return obj.map((v: string) => snakeCaseKeys(v))

  return Object.keys(obj).reduce((acc: any, key) => {
    acc[snakeCase(key)] = snakeCaseKeys(obj[key])
    return acc
  }, {})
}

/**
 * Transform object key to camel case
 * @param obj
 * @returns
 */
export const camelCaseKeys: any = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return obj
  if (Array.isArray(obj)) return obj.map((v: string) => camelCaseKeys(v))

  return Object.keys(obj).reduce((acc: any, key) => {
    acc[camelCase(key)] = camelCaseKeys(obj[key])
    return acc
  }, {})
}

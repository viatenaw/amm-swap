import { Hash, UrlPath, Uuid } from '../shared/helpers/util'

export interface UserProps {
    user: string
}
export interface UserUrlProps extends UserProps {
    organization: Uuid
}

// Basic
export const rootPath: UrlPath<{}> = '/'
export const homePath: UrlPath<{}> = '/'
export const swapPath: UrlPath<{}> = '/swap'
export const poolPath: UrlPath<{}> = '/pool'
export const userPath: UrlPath<UserUrlProps> = `${homePath}/user/:user`

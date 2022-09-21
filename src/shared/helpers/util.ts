import * as queryString from 'querystring'
import { InjectedConnector } from '@web3-react/injected-connector'
import Web3 from 'web3';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';


export const debounce = (fn: any, delay: any) => {
    let timeoutId: any;
    return function () {
        if (timeoutId) clearInterval(timeoutId);
        timeoutId = setTimeout(() => {
            fn()
        }, delay)
    }
}

export const numberFormatter = (num: number, digits: number) => {
    if (num > 0 && num < 0.001) return '<0.001'
    if (num < 1) return parseFloat(Number(num).toFixed(3))
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const capitalizeFirstLetter = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const sanitize = (str: string) => {
    const reg = /[&<>"'.#$@!%^&\*:;,?~`\+\-_=()[\]{}]/ig;
    return str.replaceAll(reg, '').trim();
}

export const range = (from: number, to: number, step = 1) => {
    if (to === from) return []
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export const CHAIN_ID: any = 97
export const validateNumberInput = (e: any) => {
    let { value, max } = e.target;
    if (value.indexOf(".") >= 0) {
        const whole = value.substr(0, value.indexOf("."))
        const rest = value.substr(value.indexOf("."), 5)
        let dec = rest.split(".")[1]
        value = whole + '.' + dec.substr(0, 5)
    }

    if (isValid(value)) {
        if (max) {
            if (Number(value) <= max) {
                return value
            }
            return max
        }
        return value
    }
    return ''

}

function isValid(str: any) {
    return !/[~`!@#$%\^&*()+=\-\_\[\]\\';,\/{}|\\":<>\\A-Za-z\? ]/g.test(str);
}
export const toFixed = (val: any) => {
    if (!val) return ''
    return val.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]
}

export const injector = new InjectedConnector({
    supportedChainIds: [CHAIN_ID]
})

export const walletConnectConfig = new WalletConnectConnector({
    rpc: {
        97: "https://data-seed-prebsc-2-s2.binance.org:8545/",
    },
    supportedChainIds: [CHAIN_ID],
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-2-s2.binance.org:8545/");

export type Uuid = string
export type Hash = string
export type Money = number
export type UrlPath<T> = string & { _?: T } // Basically a string.  The second clause is to peg the generic type
export type StaticUrlPath = UrlPath<{}>
export type Image = any
export type StringMap = { [key: string]: string }

export const formatAddress = (walletAddress?: any) => {
    const address = walletAddress?.toString();

    const formattedAddress = `${address?.substr(0, 6)}...${address?.substr(
        address.length - 4,
        address.length
    )}`;

    return formattedAddress;
};

export function roundFloat(value: number | undefined): number {
    return value ? parseFloat(value.toFixed(2)) : 0
}

export function toCommaFloat(value: number | undefined): string {
    if (value) {
        const rounded = parseFloat(value.toFixed(2))
        return toCommaNumber(rounded)
    } else {
        return '0'
    }
}

export function getQRUrl(secret: string, email: string): string {
    return `otpauth://totp/EQUA:${email}?secret=${secret}&issuer=EQUA`
}

export const getFirstTwoLetters = (name: string): string => {
    if (!name) return 'Me'
    return name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
}

export const toCommaNumber = (value: number | string) => {
    const parts = value.toString().split('.')
    const first = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return [first].concat(parts.slice(1)).join('.')
}

export function optionalCommaNumber(value?: number | string): string | undefined {
    return typeof value === 'number' || typeof value === 'string'
        ? toCommaNumber(value)
        : undefined
}

export function optionalCommaAmount(value?: number | string): string | undefined {
    if (typeof value === 'number') {
        const rounded = value.toFixed(2)
        return toCommaNumber(rounded)
    }
    else if (typeof value === 'string') return toCommaNumber(value)
    else return '0'
}


export function intStringToNumber(value: string | number): number {
    return typeof value === 'number' ? value : !!value ? parseInt(value.replace(/[$,]/g, '')) : 0
}

// TODO: Deprecated in favor of `floatStringToNumberOrUndefined`
export function floatStringToNumber(value: string | number): number | null {
    return typeof value === 'number' ? value : value
        ? parseFloat(value.replace(/[$,]/g, ''))
        : null
}

export function parseOptionalFloat(value: string | number): number | undefined {
    return typeof value === 'number' ? value : value
        ? parseFloat(value.replace(/[$,]/g, ''))
        : undefined
}

export function removeMask(value?: string): string | undefined {
    return value?.replace(/[$,]/g, '')
}

export function wrapFunction(callback: any, response?: () => any) {
    return () => {
        callback()
        if (response) return response
    }
}

export function formatBytes(bytes: number, decimals: number = 0) {
    if (bytes == 0) return '0 Bytes'
    const k = 1024
    const dm = decimals <= 0 ? 0 : decimals || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const isStepComplete = (meta: any) => {
    return !meta.error || meta.error.length === 0 || false
}

export const currentStep = (steps: any, errors: any, meta?: any) => {
    if (Object.keys(errors).length === 0) return true
    if (meta && meta.invalid) return false
    for (const step of steps) {
        if (errors[step] && (!Array.isArray(errors[step]) || (Array.isArray(errors[step]) && errors[step].length > 0))) {
            return false
        }
    }
    return true
}

export const formatFieldPath = (formPath: string | undefined) => (fieldName: string): string =>
    formPath ? `${formPath}.${fieldName}` : fieldName

export function formatDate(date: any) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [month, day, year].join('-')
}

export const isCorrectDateFormat = (date: string): boolean => {
    if (
        date.match(
            /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/
        )
    ) {
        return true
    }

    return false
}

export function getQueryParams(): any {
    // queryString.parse is supposed to ignore question marks but in some tests question marks were appearing in the
    // parsed key
    return queryString.parse(location.search.replace('?', ''))
}

export function formatQueryString(query: any): string {
    return Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}

export function genericSum<T>(getter: (value: T) => number): (items: T[]) => number {
    // prettier-ignore
    return items => items
        .map(getter)
        .reduce((a, b) => a + b, 0)
}

export function safeDivide(a: number, b: number): number {
    return b === 0 ? 0 : a / b
}

export function percentage(value: number, total: number): number {
    return safeDivide(value * 100, total)
}

export function percentageString(value: number, total: number, decimalPlaces: number = 2): string {
    const result = percentage(value, total).toFixed(decimalPlaces)

    // Don't display as decimal if the decimal value is zero
    const truncated = result.replace(/\.0+$/, '')
    return truncated + '%'
}

export function filterBy<Data>(filterObject: Data[], filterQuery: { [key: string]: any }): Data[] {
    return filterObject.reduce((aggregateArray: Data[], option: any) => {
        const filtered = Object.keys(filterQuery).every((key: string) => filterQuery[key] ? option[key] === filterQuery[key] : true)
        if (filtered) {
            aggregateArray.push(option)
        }
        return aggregateArray
    }, [])
}

export function usdString(value: number, decimalPlaces: number = 4): string {
    const isNegative = value < 0
    const negativePrefix = isNegative ? '- ' : ''
    const result = negativePrefix + '$' + toCommaNumber(Math.abs(value).toFixed(decimalPlaces))
    return decimalPlaces === 2 ? result : result.replace(/\.?0?0?$/, '')
}

export function dollarString(value: number): string {
    const isNegative = value < 0
    const negativePrefix = isNegative ? '- ' : ''
    return negativePrefix + '$' + Math.abs(value).toFixed(2)
}

export function dollarStringFromCents(value: number): string {
    return dollarString(value / 100)
}

export function normalizeDate(value: string | Date | number | undefined | null): Date | undefined {
    if (!value) return undefined
    return typeof value == 'string'
        ? new Date((value).split('T')[0].replace(/-/g, '/'))
        : new Date(value)
}

export const defaultPageSize = 25

export const getFieldValues = (fields: string[]) => (object: any) => {
    let result: string[] = []
    for (const field of fields) {
        const path = field.split('.')
        let value = object
        for (const token of path) {
            value = value[token]
            if (!value) break
        }
        result = result.concat(value)
    }
    return result
}

export function resolveObjectByString(path: any, obj = self, separator = '.') {
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev: any, curr: any) => prev && prev[curr], obj)
}

export type Transform<T> = (input: T) => T

export function currencyStringToNumber(currencyString?: string | number) {
    if (typeof currencyString === 'number') return currencyString
    return currencyString ? Number(currencyString.replace(/[^0-9\.-]+/g, '')) : null
}

export function getPathArray(pathname: string) {
    return pathname.split('/').filter(i => i)
}

export const getViewAddress = (addresses: any, type: any) => {
    const current = addresses?.filter((add: any) => add.groups.some((s: any) => s.id === type))[0]
    const withType = addresses?.filter((add: any) => add.groups.length > 0)[0]
    const hasAddress = addresses?.length > 0
    if (current) return current
    else if (withType) return withType
    else if (hasAddress) return addresses[0]
    else return undefined
}

export function daysSince(first: number, second: number = Date.now()): number {
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    return Math.round(Math.abs((first - second) / oneDay))
}

export let idCounter = 1

export function nextInternalId(): number {
    return idCounter++
}

export let userStateCount = 1

export function nextStateCount(): number {
    return userStateCount++
}

export function resetStateCount(): number {
    return userStateCount = 1
}

export interface ChildProps {
    children?: React.ReactNode
}

export function formatImageUrl(image: Hash): string {
    return `/api/v1/file/${image}/content`
}

export function getQueryParamFloat(queryParams: any, key: string): number | undefined {
    const value = queryParams[key]
    return value ? parseFloat(value) : undefined
}

export function getQueryParamInt(queryParams: any, key: string): number | undefined {
    const value = queryParams[key]
    return value ? parseInt(value) : undefined
}

export function matchesPath(path: string, value: string, exact: boolean): boolean {
    const generalized = path.replace(/:\w+/g, '[^/]*?')
    const pattern = `^${generalized}${exact ? '$' : ''}`
    const regex = new RegExp(pattern)
    return !!value.match(regex)
}
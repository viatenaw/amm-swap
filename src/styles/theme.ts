import { rgba } from 'polished'

export const headerHeight = '56px'

export interface Sizes {
    XXS: number | string,
    XS: number | string,
    S: number | string,
    M: number | string,
    L: number | string,
    XL: number | string,
    XXL: number | string,
}

export const gapSizes: Partial<Sizes> = {
    S: '10px',
    M: '20px',
    L: '30px',
    XL: '40px',
    XXL: '50px',
}

export const screenSizes: Partial<Sizes> = {
    XXS: 420,
    XS: 480,
    S: 640,
    M: 768,
    L: 1024,
    XL: 1280,
    XXL: 1440,
}

export const fontSizes: Sizes = {
    XXS: '14px',
    XS: '16px',
    S: '18px',
    M: '24px',
    L: '32px',
    XL: '36px',
    XXL: '48px',
}

export const lineHeights: Sizes = {
    XXS: '14px',
    XS: '24px',
    S: '18px',
    M: '24px',
    L: '32px',
    XL: '36px',
    XXL: '48px',
}

export const textAreaSizes = {
    S: '92px',
    M: '108px',
    L: '128px',
}

interface ThemeWithStates {
    [propName: string]: string
}

export interface Colors {
    darkNavy: string,
    white: string,
    gray: string,
    error: string,
    black: string,
    green: string,
    blue: string,
    warning: string,
    lightGrey: string,
    yellowish: string,
    skyBlue: string,
    cyan: string,
    pink: string,
    navyHigh: string,
    darkGray: string,
    darkestGray: string,
    darkestblue: string,
    darkOrange: string,
    darkGreen: string,
    offGrey: string,
    lightBlack: string,
    gray2: string,
    gray3: string,
    gray4: string

}

export const colors: Colors = {
    darkNavy: '#f7f8fa',
    white: '#ffffff',
    gray: '#353b48',
    black: '#000000',
    error: '#ff6871',
    green: '#27AE60',
    blue: '#fff',
    warning: '#FCB630',
    lightGrey: '#536167',
    yellowish: "#4cd137",
    skyBlue: '#e1b12c',
    cyan: '#487eb0',
    pink: '#353b48',
    navyHigh: "#52536D",
    darkGray: "#BDBDBD",
    darkestGray: "#828282",
    darkestblue: rgba(0, 0, 0, 0.2),
    darkOrange: '#f2994acc',
    darkGreen: "#219653",
    offGrey: "#E0E0E0",
    lightBlack: "#3C434E",
    gray2: '#dedede',
    gray3: '#868686',
    gray4: '#6a6a6a'
}

export interface Theme {
    [propName: string]: string | ThemeWithStates | { [propName: string]: ThemeWithStates } | undefined,
    primary: string,
    primaryText: string,
    secondary: string,
    secondaryText: string,
    success: string,
    gray: string,
    error: string,
    grad1: string,
    grad2: string,
    white: string,
    black: string,
    warning: string,
    submittedSnackbar: string,
    navyHigh: string,
    disabled: string,
    disabledText: string,
    darkestblue: string,
    darkOrange: string,
    darkGreen: string,
    offGrey: string,
    lightBlack: string,
    gray2: string,
    gray3: string,
    gray4: string
    
}

export const basicTheme: Theme = {
    primary: colors.blue,
    primaryText: colors.yellowish,
    secondary: colors.darkNavy,
    secondaryText: colors.skyBlue,
    success: colors.green,
    navyHigh: colors.navyHigh,
    error: colors.error,
    grad1: colors.cyan,
    grad2: colors.pink,
    gray: colors.gray,
    white: colors.white,
    black: colors.black,
    warning: colors.warning,
    submittedSnackbar: colors.lightGrey,
    disabled: colors.darkGray,
    disabledText: colors.darkestGray,
    darkestblue: colors.darkestblue,
    darkOrange: colors.darkOrange,
    darkGreen: colors.darkGreen,
    offGrey: colors.offGrey,
    lightBlack: colors.lightBlack,
    gray2: colors.gray2,
    gray3: colors.gray3,
    gray4: colors.gray4
}

export const lightTheme: Theme = {
    primaryText: colors.yellowish,
    secondaryText: colors.skyBlue,
    success: colors.green,
    primary: rgba('#f2f2f2', 1),
    secondary: rgba('#f2f2f2', 1),
    action: rgba('#394E5B', 0.1),
    error: colors.error,
    navyHigh: colors.navyHigh,
    grad1: colors.cyan,
    grad2: colors.pink,
    gray: rgba('#FFF', 0.5),
    white: '#262626',
    black: colors.black,
    warning: colors.warning,
    submittedSnackbar: colors.lightGrey,
    disabled: colors.darkGray,
    disabledText: colors.darkestGray,
    darkestblue: colors.darkestblue,
    darkOrange: colors.darkOrange,
    darkGreen: colors.darkGreen,
    offGrey: colors.offGrey,
    lightBlack: colors.lightBlack,
    gray2: colors.gray2,
    gray3: colors.gray3,
    gray4: colors.gray4


}

export enum Themes {
    BASIC,
    LIGHT,
}

export const getTheme = (theme: Themes) => {
    switch (theme) {
        case Themes.BASIC:
            return basicTheme
        case Themes.LIGHT:
            return lightTheme
        default:
            return basicTheme
    }
}

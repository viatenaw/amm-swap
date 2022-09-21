import { Provider } from 'react-redux'
import { ThemeProvider } from "styled-components"

import { RoutesComponent } from "./routes/Routes"
import { getTheme, Themes } from "../../styles/theme"
import { GlobalStyle } from "../../styles/globalStyle"
import store from '../../logic/redux/store'
import "./App.css"

export const App = () => {

    const currentTheme = { ...getTheme(Themes.BASIC), selected: Themes.BASIC }

    return (
        <Provider store={store}>
            <ThemeProvider theme={currentTheme}>
                <GlobalStyle />
                <RoutesComponent />
            </ThemeProvider>
        </Provider>
    )
}
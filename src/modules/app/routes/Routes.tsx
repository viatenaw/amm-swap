import { Route, Routes, Navigate } from "react-router-dom"

import { poolPath, rootPath, swapPath } from "../../../logic/paths"
import { withHeader } from "../../../shared/hocs/withHeader"
import { Pool } from "../../pool/pages/Pool"
import { Swap } from "../../swap/pages/Swap"
import { PageNotFound } from "../pageNotFound/PageNotFound"


const notFoundRoute: any = {
    path: "*",
    element: <div />,
    protected: false,
    title: "",
}

export const routes: any[] = [
    {
        path: rootPath,
        element: Pool,
        protected: false,
        title: "Pool",
        pathType: 0,
    },
    {
        path: swapPath,
        element: Swap,
        protected: false,
        redirect: swapPath,
        title: "Swap",
        pathType: 0,
    },
    {
        path: '*',
        element: PageNotFound,
        protected: false,
        title: "Page Not Found",
        pathType: 0,
    }
].map(r => ({ ...r, element: withHeader(r.element) }))
    .concat() // Ensure that notFound is the last route


interface Props {
    // userLoaded: boolean
}
interface RoutesProps { }

export interface User {
    id: string
}

function getRouteRenderWithAuth(isLoggedIn: boolean, route: any) {
    if (isLoggedIn === route.protected || !route.redirect) {
        const RouteComponent = route.requires ? route.requires(route.element) : route.element
        return { element: <RouteComponent /> }
    } else {
        return { element: <Navigate replace to={route.redirect} /> }
    }
}

export const RoutesComponent: React.FC<Props & RoutesProps> = () => {
    const isLoggedIn = false

    const mapRoutes = (route: any, i: number) => {
        const render = getRouteRenderWithAuth(isLoggedIn, route)
        return <Route key={i} path={route.path} {...render} />
    }

    return (
        <Routes>
            {routes.map(mapRoutes)}
        </Routes>
    )
}

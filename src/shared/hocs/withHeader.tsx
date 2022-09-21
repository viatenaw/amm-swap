import * as React from 'react'
import styled from 'styled-components'
import { ReactComponentElement } from 'react'

import { matchesPath } from '../helpers/util'
import { homePath } from '../../logic/paths'
import { Navbar } from '../../modules/app/navbar/Navbar'

export interface HeaderLinks {
    path?: string,
    defaultUrl?: string,
    title: string,
    image: ReactComponentElement<any>
}

const FixedHeader = styled.div<any>`
  z-index: 999;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  top: 0;
  background: white;
  position: fixed;
`

export const Header = (props: any) => {



    const matchUrls = (urls: string[]) => {
        let value: boolean = false
        urls.forEach(url => {
            const matched = matchesPath(url, window.location.pathname, true)
            if (matched) value = true
        })
        return value
    }
    
    return  (
        <FixedHeader>
            <Navbar />
        </FixedHeader>
    ) 
}

export function withHeader(InnerComponent: any) {
    console.log('llllllllll');
    
    return (props: any) => (
        <React.Fragment>
            <Header {...props} />
            <InnerComponent {...props} />
        </React.Fragment>
    )
}
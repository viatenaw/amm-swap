import { SET_CONNECT_WALLET, SET_IS_WRONG_NETWORK } from '../actions/actionTypes'
import { SET_DISCONNECT_WALLET } from '../actions/actionTypes'

const initialState = {
    connected: false,
    connectwallet: false,
    disconnectWallet: false,
    isWrongNetwork: false
}

export const navbarReducer = (state = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case SET_CONNECT_WALLET:
            return {
                ...state,
                connectwallet: payload
            }
        case SET_DISCONNECT_WALLET:
            return {
                ...state,
                disconnectWallet: payload
            }
        case SET_IS_WRONG_NETWORK:
            return {
                ...state,
                isWrongNetwork: payload
            }
        default:
            return state
    }
}
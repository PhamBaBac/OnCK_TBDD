import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './UserSlice'
const Store = configureStore({
    reducer: {
        users: userReducer
    }
})

export default Store
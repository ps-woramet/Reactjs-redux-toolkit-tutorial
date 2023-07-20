// rafce
import React from 'react'

import { useSelector } from 'react-redux'

const ComponentA = ({msg}) => {

const stateStore = useSelector((state) => ({...state}))
const {userReducer} = useSelector((state) => ({...state}))
const {personReducer} = useSelector((state) => ({...state}))
console.log(stateStore)

return (
    <div>
        <h2>Component A</h2>
        <p>store: {userReducer.value}</p>
        <p>prop: {msg}</p>
        {userReducer.loading?<p>hello</p>: <p>hi</p>}
        <p>state person value {personReducer.value}</p>
        <p>stateStore: {stateStore.userReducer.value} and {stateStore.personReducer.value}</p>
    </div>
)
}

export default ComponentA


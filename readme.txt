ขั้นตอน
    -create userSlice and action
    -กำหนดค่า userSlice ใน store
    -ส่งค่าจาก store ใน main.jsx
        -main.jsx
            <Provider store={storeCf}>
                <App />
            </Provider>
    -ComponentA แสดงค่า state ด้วย useSelector
    -ComponentB ส่ง action เพื่อ update state ด้วย dispatch(action) 
    *หากต้องการส่งข้อมูลด้วยให้ใช้ dispatch(action, data) โดย action ใน userSlice.js ต้องมีพารามิเตอร์รับค่าด้วยตามตัวอย่าง ที่ action clickred และเข้าถึงข้อมูลด้วย payload
        
        -ComponentB.jsx ทำการใช้ useDispatch เพื่อส่ง action

            const data = {
                username: 'ps-woramet',
                password: '123456'
            }

            const handleClickred = () =>{
                dispatch(clickred(data))
            }

        -userSlice.js กำหนด action และ รับค่าdata 
        จากตัวอย่าง clickred มีการรับค่าdata และเข้าถึง data ด้วย payload, clickblue ไม่มีการรับค่า data

            reducers:{
                clickred:((state,data1) => {
                    state.value = "click red button";
                    state.list = data1.payload;
                }),
                clickblue:((state) => {
                    state.value = "click blue button";
                })
            }

0. npm create vite@latest
    > react
    > project name: reactjs-redux-toolkit-tutorial
    > cd reactjs-redux-toolkit-tutorial

1. install redux
    npm install redux react-redux @reduxjs/toolkit

2. install Redux DevTools (browser Extension)
    Redux DevTools

3. แก้ไข app.jsx

    import './App.css'

    function App() {

    return (
        <>
        <h2>App.jsx</h2>
        </>
    )
    }

    export default App

4. สร้าง store -> userSlice.js

    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        value: 'hello initial state',
    };

    export const userSlice = createSlice({
        // name slice
        name: 'user',
        initialState: initialState,
        // action
        reducers:{

        }
    });

    export default userSlice.reducer;

5. ทำการ configure store
    สร้างไฟล์ store -> store.js
    
    // เพื่อใช้สร้าง store สำหรับแอปพลิเคชัน
    import { configureStore } from "@reduxjs/toolkit";
    
    // การนำเข้า userSlice ซึ่งเป็น reducer หรือส่วนของ state ที่จะถูกจัดการโดย Redux Toolkit.
    import userSlice from "./userSlice";

    export const store = configureStore({

        //การกำหนดค่า reducer ของ store เพื่อจัดการ state ชื่อ userReducer และจะถูกจัดการด้วย reducer ที่ถูกนิยามใน userSlice.
        reducer:{
            userReducer: userSlice
        }
    })

6. เพิ่ม component ของ react redux ที่ใช้สำหรับส่ง store ที่สร้างโดย configureStore ในที่นี้คือ storeCf โดยส่งผ่าน prop ที่ชื่อว่า store ของ Provider นี้

    import { Provider } from 'react-redux'
    import {store} from './store/store'

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </React.StrictMode>,
    )

7. สร้าง ComponentA, ComponentB และ เรียกใช้ใน app.js
    src -> components -> ComponentA.jsx
    src -> components -> ComponentB.jsx

    -ComponentA.jsx
        // rafce
        import React from 'react'

        const ComponentA = () => {
        return (
            <div>
                <h2>Component A</h2>
            </div>
        )
        }

        export default ComponentA

    -App.jsx สามารถส่ง prop ที่มีชื่อว่า msg ไปที่ Component Aได้
        import './App.css'
        import ComponentA from './components/ComponentA'
        import ComponentB from './components/ComponentB'

        function App() {

        return (
            <>
                <h2>App.jsx</h2>
                <hr />
                <hr />
                <ComponentA  msg={'msg to componentA'}/>
                <hr />
                <hr />
                <ComponentB/>
            </>
        )
        }

        export default App

8. เรียกใช้งาน state มาแสดงผ่าน useSelector
    ใช้งาน useSelector เพื่อเลือกเฉพาะ state ที่เกี่ยวข้องกับ userReducer จาก Redux store (ค่าใน initialState)

    // rafce
    import React from 'react'

    import { useSelector } from 'react-redux'

    const ComponentA = ({msg}) => {

    const {userReducer} = useSelector((state) => ({...state}))

    return (
        <div>
        <h2>Component A</h2>
        <p>store: {userReducer.value}</p>
        <p>prop: {msg}</p>
        </div>
    )
    }

    export default ComponentA

9. กำหนด action clickred, clickblue และ export userSlice.actions (เพื่อเลือก actionใน slice ไปใช้งาน)
    โดยเมื่อเข้าเงื่อนไข action จะทำการเปลี่ยน value ของ state ที่กำหนดค่าเรอิ่มต้นไว้ใน initial state 

    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        value: 'hello initial state',
    };

    export const userSlice = createSlice({
        // name slice
        name: 'user',
        initialState: initialState,
        // action
        reducers:{
            clickred:((state) => {
                state.value = "click red button";
            }),
            clickblue:((state) => {
                state.value = "click blue button";
            })
        }
    });

    export const {clickred, clickblue} = userSlice.actions;
    export default userSlice.reducer;

10. ทำการส่ง action ผ่าน useDispatch เพื่อแก้ไข state
    ทำการ import useDispatch และ action ที่ต้องการใช้มา
    จากนัน้สร้างตัวแปร dispatch เพื่อใช้งาน useDispatch

    // rafce
    import React from 'react'

    import { useDispatch } from 'react-redux'
    import {clickred, clickblue} from '../store/userSlice'

    const ComponentB = () => {

    const dispatch = useDispatch();

    const handleClickred = () =>{
        dispatch(clickred())
    }
    return (
        <div>
            <h2>Component B</h2>
            <button onClick = {handleClickred} style={{color: 'white', background: 'red'}}>red button</button>
            <button onClick = {() => dispatch(clickblue())} style={{color: 'white', background: 'blue'}}>blue button</button>
        </div>
    )
    }

    export default ComponentB

11. ส่งข้อมูลจาก chlid component ไปพร้อมกับ action เพื่อแก้ไข state ใน userSlice ใหม่ให้เป็นข้อมูลที่ส่งมาแทน

    ทำการเพิ่ม state list และ loading ใน initialState
    ที่ action clickred ทำการรับข้อมูล data1 จากนั้นแก้ไข state.list = data1.payload
    ซึ่ง data1 เป็นพารามิเตอร์ที่รับมาจาก action และ payload เป็นข้อมูลที่ส่งมาในการเรียกใช้งาน action นี้.
    
    src -> store -> userSlice.js

        import { createSlice } from "@reduxjs/toolkit";

        const initialState = {
            value: 'hello initial state',
            list: [],
            loading: true
        };

        export const userSlice = createSlice({
            // name slice
            name: 'user',
            initialState: initialState,
            // action
            reducers:{
                clickred:((state,data1) => {
                    state.value = "click red button";
                    state.list = data1.payload;
                    console.log(state.list);
                    state.loading = true;
                }),
                clickblue:((state) => {
                    state.value = "click blue button";
                    state.loading = false;
                })
            }
        });

        export const {clickred, clickblue} = userSlice.actions;
        export default userSlice.reducer;

    ทำการสร้างข้อมูลที่ต้องการส่งและส่งค่าไปให้กับ action clickred

    src -> components -> ComponentB.jsx

        // rafce
        import React from 'react'

        import { useDispatch } from 'react-redux'
        import {clickred, clickblue} from '../store/userSlice'

        const ComponentB = () => {

        const dispatch = useDispatch();

        const data = {
            username: 'ps-woramet',
            password: '123456'
        }

        const handleClickred = () =>{
            dispatch(clickred(data))
        }
        return (
            <div>
            <h2>Component B</h2>
            <button onClick = {handleClickred} style={{color: 'white', background: 'red'}}>red button</button>
            <button onClick = {() => dispatch(clickblue())} style={{color: 'white', background: 'blue'}}>blue button</button>
            </div>
        )
        }

        export default ComponentB

12. ทดลองนำ state loadings มา check เงื่อนไข

    src -> components -> ComponentA.jsx

    // rafce
    import React from 'react'

    import { useSelector } from 'react-redux'

    const ComponentA = ({msg}) => {

    const {userReducer} = useSelector((state) => ({...state}))

    return (
        <div>
            <h2>Component A</h2>
            <p>store: {userReducer.value}</p>
            <p>prop: {msg}</p>
            {userReducer.loading?<p>hello</p>: <p>hi</p>}
        </div>
    )
    }

    export default ComponentA

13. ทำการ createSlice ที่มีชื่อ personSlice ใน personSlice.js และ ทำการ configure store ใน store.js
    
    -สร้าง src -> store -> personSlice.js

        import { createSlice } from "@reduxjs/toolkit";

        const initialState = {
            value: 'person',
        };

        export const personSlice = createSlice({
            // name slice
            name: 'person',
            initialState: initialState,
            // action
            reducers:{
                clickgreen:((state) => {
                    state.value = "click green button";
                }),
                clickyellow:((state) => {
                    state.value = "click yellow button";
                })
            }
        });

        export const {clickgreen, clickyellow} = personSlice.actions;
        export default personSlice.reducer;

    -configureStore ทำการ import personSlice และ configure personSlice

        import { configureStore } from "@reduxjs/toolkit";
        import userSlice from "./userSlice";
        import personSlice from "./personSlice";

        export const storeCf = configureStore({
            reducer:{
                // reducer name in stroe : reducer object
                // reducer name in store : useReducer
                // reducer object : userSlice
                userReducer: userSlice,
                personReducer :personSlice
            }
        })
    
    -เรียกใช้งาน state มาแสดงผ่าน useSelectorที่ ComponentA
    หากต้องการเรียก state ทั้งหมดใน store ไม่ต้องใส่ {}
    จากตัวอย่าง const stateStore = useSelector((state) => ({...state}))
    stateStore จะเก็บค่า userReducer และ personReducer

    src -> components -> componentA

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
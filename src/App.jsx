import './App.css'
import ComponentA from './components/ComponentA'
import ComponentB from './components/ComponentB'

function App() {

  return (
    <>
      <h2>App.jsx</h2>
      <hr />
      <hr />
      <ComponentA msg={'msg to componentA'}/>
      <hr />
      <hr />
      <ComponentB/>
    </>
  )
}

export default App

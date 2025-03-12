import './App.css'
import Welcome from './components/Welcome'
import Form from './components/Form'
import Counter from './components/Counter'

function App() {
  return (
    <>
    <div>
        <Welcome name={"World"}/>
    </div>
    <div>
        <Counter/>

    </div>
    <div>
        <Form/>
        
    </div>

 
</>
  )
}

export default App

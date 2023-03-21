import Home from './components/routes/home.component'
import { Routes,Route, Outlet } from 'react-router-dom'
import Navigation from './components/routes/navigation.component'
import SignIn from './components/routes/sign.component'

const Shop = () => {
  return(
    <div>Shop Page</div>
  )
}



const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path="signIn" element={<SignIn></SignIn>} />
      </Route>
      
    </Routes>
  )
}

export default App
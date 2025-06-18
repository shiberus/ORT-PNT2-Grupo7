import { Route, Routes, useLocation } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import Profile from '../features/user/pages/Profile'
import Home from '../components/Home/Home'

const Router = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path='/' element={<Home key={location.key} />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default Router
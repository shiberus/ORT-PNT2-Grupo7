import { Route, Routes } from 'react-router'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import Profile from '../features/user/pages/Profile'

const Router = () => {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default Router
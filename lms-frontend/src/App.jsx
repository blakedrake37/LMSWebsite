
import './App.css'
import CreateAccountComponent from './components/CreateAccountComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListAccountComponent from './components/ListAccountComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SideBarComponent from './components/SideBarComponent'
import ListPublisherComponent from './components/ListPublisherComponent'
import AddPublisherComponent from './components/AddPublisherComponent'
import ListAuthorComponent from './components/ListAuthorComponent'
import AddAuthorComponent from './components/AddAuthorComponent'
import ListCategoryComponent from './components/ListCategoryComponent'
import AddCategoryComponent from './components/AddCategoryComponent'
import HomePage from './Pages/HomePage'
import ListBookComponent from './components/ListBookComponent'
import NavBar from './User/components/NavBar'
import UserRouters from './Routers/UserRouters'
import AdminRouters from './Routers/AdminRouters'

function App() {

  return (
    <>
    <Routes>
      <Route path='/*' element = {<UserRouters/>} ></Route>
      <Route path='/admin/*' element = {<AdminRouters/>} ></Route>
    </Routes>
    {/* <BrowserRouter>
      <NavBar/> */}
      {/* <NavigationComponent/> */}
        {/* <Routes>
          <Route path='/' element = {<HomePage/>} ></Route>
          <Route path='/accounts' element = {<ListAccountComponent/>} ></Route>
          <Route path='/ni' element = {<CreateAccountComponent/>}></Route>
          <Route path='/update-account/:id' element = {<CreateAccountComponent/>}></Route>
          <Route path='/publishers' element={<ListPublisherComponent/>}></Route>
          <Route path='/add-publisher' element={<AddPublisherComponent/>}></Route>
          <Route path='/update-publisher/:id' element={<AddPublisherComponent/>}></Route>
          <Route path='/authors' element={<ListAuthorComponent/>}></Route>
          <Route path='/add-author' element={<AddAuthorComponent/>}></Route>
          <Route path='/update-author/:id' element={<AddAuthorComponent/>}></Route>
          <Route path='/categories' element={<ListCategoryComponent/>}></Route>
          <Route path='/add-category' element={<AddCategoryComponent/>}></Route>
          <Route path='/update-category/:id' element={<AddCategoryComponent/>}></Route>
        </Routes> */}
      {/* <FooterComponent/> */}
    {/* </BrowserRouter> */}
    </>
  )
}

export default App

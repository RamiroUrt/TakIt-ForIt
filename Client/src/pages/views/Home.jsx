import React from 'react'
import TaskList from '../../components/TaskList'
import Logo from '../../../public/img/logo.png'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    <main className='flex flex-col min-h-screen'>
        <div className="text-box-main">
            <h1>Task List For It</h1>
        </div>
        <TaskList />
        <div className="logo-contain mt-auto">
            <Link to="/">
            <img src={Logo} alt="" />
            </Link>
        </div>
    </main>
    </>
  )
}

export default Home
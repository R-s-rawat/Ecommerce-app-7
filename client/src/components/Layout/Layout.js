import React from 'react'
import Header from './Header'
import Footer from './Footer'

// // for app.js content to work in b/w this content tags, like <h1> between <layout></layout>, pass {props} to LAYOUT and print {props.children}

// const Layout = (props) => {
//   return (
//     <div>
//         <Header>
//          <main>{props.children}</main>
//          </Header>
//     </div>
//   )
// }

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
         <main style={{minHeight:"80vh"}}>{children}</main>
         <Footer/>
    </div>
  )
}

export default Layout
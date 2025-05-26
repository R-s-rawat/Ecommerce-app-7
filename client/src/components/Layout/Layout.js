import React from 'react'

// // for app.js content to work in b/w this content tags, like <h1> between <layout></layout>, pass {props} to LAYOUT and print {props.children}

const Layout = (props) => {
  return (
    <div>
        <h1>Layout</h1>
         {props.children}
    </div>
  )
}

export default Layout
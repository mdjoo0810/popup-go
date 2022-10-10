import React from "react"
import { Link } from "gatsby"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"
import { motion } from "framer-motion"

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <main className="main-body">{children}</main>
      </motion.div>
    </>
  )
}

export default Layout

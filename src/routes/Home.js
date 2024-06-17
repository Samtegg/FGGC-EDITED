import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/homepage/navbar/Navbar'
import Hero from '../components/homepage/hero/Hero'
import HowItWorks from '../components/homepage/howitworks/HowItWorks'
import Com from '../components/homepage/com/Com'
import Activities from '../components/homepage/activities/Activities'
import Levels from '../components/homepage/levels/Levels'
import About from '../components/homepage/about/About'
import Try from '../components/homepage/try/Try'
import Over from '../components/homepage/over/Over'
import Footers from '../components/homepage/footer/Footers'

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Hero />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <HowItWorks />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <Com />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <Activities />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        <Levels />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <About />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
        <Try />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
        <Over />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>
        <Footers />
      </motion.div>
    </motion.div>
  )
}

export default Home

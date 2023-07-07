import React from 'react'
import SectOne from './SectOne/SectOne'
import SectTwo from './SectTwo/SectTwo'
import SectThree from './SectThree/SectThree'
import SectFour from './SectFour/SectFour'
import SectFive from './SectFive/SectFive'
// import EnquiryForm from './EnquiryForm/EnquiryForm'


const MainContent = () => {
  return (
    <div>
      <section>
        <SectOne />
        <SectTwo />
        <SectThree />
        <SectFour />
        <SectFive />
        {/* <EnquiryForm /> */}
      </section>
    </div>
  )
}

export default MainContent
import React from 'react'
import "./footer.css"
import { Typography } from 'antd'

const Footer = () => {
  return (
    <div className='DashboardFooter'>
      <Typography.Link href='tel:+123456789'>+123456789</Typography.Link>
      <Typography.Link href='/'>Privacy Policy</Typography.Link>
      <Typography.Link href='/'>Terms of Use</Typography.Link>
    </div>
  )
}

export default Footer
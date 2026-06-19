import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  redirect('/dashboard/overview')
}

export default DashboardPage
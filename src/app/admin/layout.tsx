import SideBar from '@/components/layout/sideBar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }
  
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-4 lg:p-6 bg-[#fdfdfc] min-w-0 overflow-auto lg:ml-0">
        {children}
      </main>
    </div>
  )
}

export default layout
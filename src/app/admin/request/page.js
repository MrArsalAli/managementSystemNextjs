import React from 'react'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import { getRequest } from '@/actions/requests'

export default async function Requests() {
    const session = await auth()
    if(!session && session?.user?.role != "admin") redirect("/")
        const requests = await getRequest()
        console.log(requests);
        
  return (
    <div className='container mx-auto'>
        <h1 className='my-4 font-bold text-3xl'>{`Doctor's`} Requests</h1>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        </div>
    </div>
  )
}

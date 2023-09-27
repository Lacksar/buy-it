import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const myprofile = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/")
        }
    })


    return (
        <div>MyProfile</div>
    )
}

export default myprofile
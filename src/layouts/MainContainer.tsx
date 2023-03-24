import Navbar from "@/components/Navbar"

import { ReactNode } from "react"

interface IMaincontainer {
  children: ReactNode
}

export default function MainContainer({ children }: IMaincontainer) {

  return (
    <>
      <div>
        <Navbar />
        <div className="flex justify-center items-center ">
          {children}
        </div>
      </div>
    </>
  )
}
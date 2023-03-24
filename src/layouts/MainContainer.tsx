import Header from "@/components/Header"

import { ReactNode } from "react"

interface IMaincontainer {
  children: ReactNode
}

export default function MainContainer({ children }: IMaincontainer) {

  return (
    <>
      <div>
        <Header />
        <div className="flex justify-center items-center ">
          {children}
        </div>
      </div>
    </>
  )
}
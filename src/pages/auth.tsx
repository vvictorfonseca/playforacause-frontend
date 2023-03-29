import RegisterForm from "@/components/RegisterForm"
import LoginForm from "@/components/LoginForm"

export default function Auth() {
  return (
    <div className=" w-[100vw] flex flex-col justify-center items-center sm:flex-row">
      <div className=" w-[50%] sm:h-[82vh] h-[100%] ">
        <RegisterForm />
      </div>
      <div className=" w-[50%] sm:h-[82vh] h-[100%]">
        <LoginForm />
      </div>
    </div>
  )
}
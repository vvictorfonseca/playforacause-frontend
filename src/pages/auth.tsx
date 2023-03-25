import RegisterForm from "@/components/RegisterForm"
import LoginForm from "@/components/LoginForm"

export default function Auth() {
  return (
    <div className=" w-[100vw] flex justify-center items-center">
      <div className=" w-[50%] h-[82vh]">
        <RegisterForm />
      </div>
      <div className=" w-[50%] h-[82vh]">
        <LoginForm />
      </div>
    </div>
  )
}
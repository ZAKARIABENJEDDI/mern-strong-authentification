import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export function LoginForm() {

  const [FormData, setFormData ] = useState({
    email: '',
    password: ''
  })

  const [isLoading ,setisLoading] = useState(false)

  const handelChange = (e) => {
    const {name, value} = e.target
    setFormData(prevState => ({
        ...prevState , [name]: value
    }))
  }

  const handelSubmit = (e) => { 
    e.preventDefault()
    setisLoading(true)
    console.log(FormData)
    axios.post("http://localhost:5000/login",FormData)
    .then( (res) => {
      console.log(res);
      setisLoading(false)
      if (res.success) {
        toast.success("Loged succesfuly")
      }
    })
    .catch( (err) => {
      console.log(err);
      toast.error(err.error)
    })

  }

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handelChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  onChange={handelChange}
                  name="password"
                  id="password"
                  type="password"
                  required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}

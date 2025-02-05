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
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm() {

  const [FormData, setFormData ] = useState({
    email: '',
    password: ''
  })

  const [isLoading ,setisLoading] = useState(false)
  const navigate = useNavigate()
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prevState => ({
        ...prevState , [name]: value
    }))
  }

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setisLoading(true);
    axios.post("http://localhost:5000/login", FormData)
    .then((res) => {
      setisLoading(false);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Logged in successfully");
        navigate("/home")
      }

      if (res.data.error) {
        toast.warning(res.data.error)
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(err.error);
      toast.error(err.error || "Une erreur s'est produite");
    });
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
                  <Link
                    to="/forget"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                        Forgot your password?
                  </Link>
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
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                className="underline underline-offset-4"
                to="/register">
                  Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}

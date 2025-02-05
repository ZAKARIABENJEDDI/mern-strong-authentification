"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios"
import { toast ,ToastContainer} from "react-toastify";

export default function RegisterForm() {
  const [FormData, setFormData] = useState({
    "name":"",
    "email":"",
    "password":"",
    "password2":""
  })

  const handelChange = (e) => {
    const {name, value} = e.target
    setFormData(prevState => ({
      ...prevState , [name]:value
    }))
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(FormData)
    axios.post("http://localhost:5000/register",FormData)
    .then((res) =>{
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.success)
      }else if(res.data.echec){
        toast.warning(res.data.echec)
      }
    })
    .catch((err) =>{
      toast.error(err)
    })
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handelSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={handelChange}
                name="name"
                id="name"
                placeholder="John Doe" 
                />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                onChange={handelChange}
                name="email"
                id="email"
                type="email"
                placeholder="johndoe@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                onChange={handelChange}
                name="password" 
                id="password" 
                type="password"
                placeholder="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input 
                onChange={handelChange}
                name="password2" 
                id="password" 
                type="password"
                placeholder="********" />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
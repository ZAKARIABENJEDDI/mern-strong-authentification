import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal} from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';

export default function Forget() {
  const [email, setemail] = useState("")
  const [code, setCode] = useState("")
  const [codeValue, setcodeValue] = useState("")
  const [isLoading ,setisLoading] = useState(false)

  const navigate = useNavigate();

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setisLoading(true);
    // console.log(code);
    if (code.length === 0) {
      axios.post("http://localhost:5000/forget",{email})
      .then((res)=>{
        setisLoading(false);
        if (res.data.isValid) {
          toast.success(res.data.isValid)
        }
        if (res.data.error) {
          toast.warning(res.data.error)
        }
        if(res.data.code){
          setCode(res.data.code)
          toast.success(res.data.code)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }else{
      setisLoading(false);
      if(code === codeValue){
        toast.success("Code Correct")
        setTimeout(() => {
          // navigate("/change_password")
          navigate("/change_password", { state: { email } });
        }, 300);
      }else{
        toast.warning("Code Incorrect");
      }
    }
  }

  const [openModal, setOpenModal] = useState(true);
  const onCloseModal = () => {
    setOpenModal(false);
    setemail('');
    navigate("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handelSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Remember your password&nbsp;
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" />
                </div>
                <Input
                    onChange={(e) => {
                      setemail(e.target.value)
                    }}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
              </div>
                {code ? <>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="code">Enter Code</Label>
                  </div>
                  <Input
                      onChange={(e) => {
                        setcodeValue(e.target.value)
                      }}
                      name="code"
                      id="code"
                      type="text"
                      readOnly={!code}
                      disabled={!code}
                    />
                </div></> : ""}
              <div className="w-full">
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {code ? "Verifie" : isLoading ? "..." : "Send Code"}
                </Button>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                <Link
                  to="/register"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  )
}

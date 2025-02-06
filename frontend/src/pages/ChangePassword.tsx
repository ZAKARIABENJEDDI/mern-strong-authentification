import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000")
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const [openModal, setOpenModal] = useState(true);
  const onCloseModal = () => {
    setOpenModal(false);
    navigate("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handelSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                Change password
              </div>
              <div className="space-y-5" data-hs-toggle-password-group>
                <div className="max-w-sm">
                  <label htmlFor="hs-toggle-password-multi-toggle-np" className="block text-sm mb-2 dark:text-white">New password</label>
                  <div className="relative">
                    <input id="hs-toggle-password-multi-toggle-np" type="password" className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter new password" />
                    <button type="button" data-hs-toggle-password='{"target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]}' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                      <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="max-w-sm mb-5">
                  <label htmlFor="hs-toggle-password-multi-toggle" className="block text-sm mb-2 dark:text-white">Current password</label>
                  <div className="relative">
                    <input id="hs-toggle-password-multi-toggle" type="password" className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter current password" defaultValue="12345qwerty" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Button type="submit">Submit</Button>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                <Link to="/register" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw, UserPen } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/lib/actions/user-action";

const editFields = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Bio",
    name: "bio",
  },
  {
    label: "Location",
    name: "location",
  },
  {
    label: "Website",
    name: "website",
  },
];

type userType = {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
};

const EditButton = ({ user }: { user: userType }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [validate, setValidate] = useState(false);
  const [open, setOpen] = useState(false);

  const EditHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const Isvalid = Object.values(values).every(
      (value) => value !== "" && value !== null
    );

    if (Isvalid) {
      setValidate(true);
      const res = await updateUserProfile(formData);
      if (res?.message == "success") {
        toast.success("Profile updated successfully");
        setLoading(false);
        setOpen(false);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full my-5 hover:!shadow-[0_0_5px_rgba(0,0,0,0.5)] !cursor-pointer">
          <UserPen /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
          {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} className="grid gap-4 py-4 -ml-2">
          {editFields.map(({ label, name }: {label: string, name: string}, index) => {
            return (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <label htmlFor={name} className="text-right w-full text-sm">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  defaultValue={user[name as keyof userType] ?? ""}
                  className="col-span-3 p-2 pr-3 text-sm border focus:shadow outline-none focus:outline-none focus:border-slate-400 rounded"
                />
              </div>
            );
          })}
        </form>
        <DialogFooter>
          <Button
            type="submit"
            onClick={EditHandler}
            className="hover:scale-105 active:scale-95 transition-transform duration-300 !cursor-pointer"
          >
            {loading ? (
              <p className="flex items-center gap-1">
                <RotateCcw className="animate-spin" /> Editing...
              </p>
            ) : (
              <p className="flex items-center gap-1 ">
                <UserPen /> Save Changes
              </p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;

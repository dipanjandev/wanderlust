"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({ id }: { id: string }) => {
  const handleDeleteDestination = async () => {
    const res = await fetch(`http://localhost:8000/destinations/${id}`, {
      method: "DELETE",
    });
    return await res.json();
    redirect("/destinations");
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button className="bg-white inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDestination}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestinationDialog;

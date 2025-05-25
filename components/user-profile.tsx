import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";

export default function UserProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded bg-blue-600 p-2 text-white">
          Open Profile
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-4">
        <ClerkUserProfile />
      </DialogContent>
    </Dialog>
  );
}

import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center">
      <Loader2Icon className="size-10 animate-spin text-brand-primary" />
    </div>
  );
}

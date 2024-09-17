import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  // ... rest of the component remains the same
}
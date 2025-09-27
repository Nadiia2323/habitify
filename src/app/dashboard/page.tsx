import { authOptions } from "../../../src/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // 🔑 Проверяем сессию на сервере
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // если не авторизован → редиректим
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="text-gray-700">{session.user?.email}</p>

      {/* Logout через form (лучший способ в App Router) */}
      <form
        action={async () => {
          "use server";
          const { signOut } = await import("next-auth/react");
          await signOut({ callbackUrl: "/login" });
        }}
      >
        <button
          type="submit"
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

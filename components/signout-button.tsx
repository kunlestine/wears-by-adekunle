import { signOut } from "@/auth"
import { deleteSession } from "@/lib/session"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}
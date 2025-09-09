import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

export function UserManagementHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end space-x-4">
        {/* Notification Bell */}
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <Avatar className="w-8 h-8">
          <AvatarImage src="/user-profile-illustration.png" alt="User" />
          <AvatarFallback className="bg-red-500 text-white text-sm">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

import { Card, CardContent } from "@/app/components/ui/card"
import { Users, UserCheck, Shield, UserPlus } from "lucide-react"

export function OverviewCards() {
  const cards = [
    {
      title: "Total Users",
      value: "12",
      description: "All registered accounts",
      icon: Users,
      iconColor: "text-gray-500",
    },
    {
      title: "Active Users",
      value: "8",
      description: "Currently active in the system",
      icon: UserCheck,
      iconColor: "text-green-500",
    },
    {
      title: "Admin Users",
      value: "6",
      description: "Users with administrative roles",
      icon: Shield,
      iconColor: "text-blue-500",
    },
    {
      title: "New Today",
      value: "5",
      description: "Users registered today",
      icon: UserPlus,
      iconColor: "text-purple-500",
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
                <card.icon className={`w-8 h-8 ${card.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

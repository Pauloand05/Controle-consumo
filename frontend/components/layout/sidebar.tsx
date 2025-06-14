"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Droplets, Zap, Plus, History, Target, Home, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Novo Consumo", href: "/consumo/novo", icon: Plus },
  { name: "Histórico", href: "/historico", icon: History },
  { name: "Metas", href: "/metas", icon: Target },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <Droplets className="h-6 w-6 text-white" />
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-white font-bold text-lg">EcoControl</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  )
}

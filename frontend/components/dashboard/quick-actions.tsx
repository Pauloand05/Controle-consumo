import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, History, Target, BarChart3 } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/consumo/novo">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Consumo
          </Button>
        </Link>

        <Link href="/historico">
          <Button className="w-full justify-start" variant="outline">
            <History className="mr-2 h-4 w-4" />
            Ver Histórico
          </Button>
        </Link>

        <Link href="/metas">
          <Button className="w-full justify-start" variant="outline">
            <Target className="mr-2 h-4 w-4" />
            Definir Metas
          </Button>
        </Link>

        <Button className="w-full justify-start" variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          Relatórios
        </Button>
      </CardContent>
    </Card>
  )
}

import { HistoricoTable } from "@/components/historico/historico-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoricoPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Consumo</CardTitle>
          <CardDescription>Visualize todos os registros de consumo anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoricoTable />
        </CardContent>
      </Card>
    </div>
  )
}

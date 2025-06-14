import { ConsumoForm } from "@/components/consumo/consumo-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NovoConsumoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Novo Consumo</CardTitle>
          <CardDescription>Registre o consumo de água e energia elétrica do mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ConsumoForm />
        </CardContent>
      </Card>
    </div>
  )
}

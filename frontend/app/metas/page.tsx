import { MetasForm } from "@/components/metas/metas-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MetasPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Definir Metas de Consumo</CardTitle>
          <CardDescription>Configure suas metas mensais de consumo de água e energia</CardDescription>
        </CardHeader>
        <CardContent>
          <MetasForm />
        </CardContent>
      </Card>
    </div>
  )
}

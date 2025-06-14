"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { metasService } from "@/services/metas-service"
import type { ConsumoData } from "@/types/consumo"
import type { MetaData } from "@/types/meta"

interface AlertsSectionProps {
  data: ConsumoData[]
}

export function AlertsSection({ data }: AlertsSectionProps) {
  const [metas, setMetas] = useState<MetaData | null>(null)

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const metasData = await metasService.getMetas()
        setMetas(metasData)
      } catch (error) {
        console.error("Erro ao carregar metas:", error)
      }
    }

    fetchMetas()
  }, [])

  const currentMonth = data[data.length - 1]
  const alerts = []

  if (currentMonth && metas) {
    if (currentMonth.consumoAgua > metas.metaAgua) {
      alerts.push({
        type: "warning",
        message: `Consumo de água (${currentMonth.consumoAgua}m³) acima da meta (${metas.metaAgua}m³)`,
      })
    }

    if (currentMonth.consumoEnergia > metas.metaEnergia) {
      alerts.push({
        type: "warning",
        message: `Consumo de energia (${currentMonth.consumoEnergia}kWh) acima da meta (${metas.metaEnergia}kWh)`,
      })
    }

    if (alerts.length === 0) {
      alerts.push({
        type: "success",
        message: "Parabéns! Você está dentro das suas metas de consumo.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Consumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            className={alert.type === "warning" ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}
          >
            {alert.type === "warning" ? (
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={alert.type === "warning" ? "text-orange-800" : "text-green-800"}>
              {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}

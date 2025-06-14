"use client"

import { useState, useEffect } from "react"
import { ConsumptionChart } from "./consumption-chart"
import { ConsumptionCards } from "./consumption-cards"
import { AlertsSection } from "./alerts-section"
import { QuickActions } from "./quick-actions"
import { consumoService } from "@/services/consumo-service"
import type { ConsumoData } from "@/types/consumo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function Dashboard() {
  const [consumoData, setConsumoData] = useState<ConsumoData[]>([])
  const [loading, setLoading] = useState(true)
  const [showMockAlert, setShowMockAlert] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await consumoService.getUltimos6Meses()
        setConsumoData(data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        // Em caso de erro, ainda assim tenta carregar dados vazios
        setConsumoData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Carregando dados do dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showMockAlert && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 flex items-center justify-between">
            <span>
              Você está visualizando dados de demonstração. Para usar dados reais, configure sua API Spring Boot.
            </span>
            <button
              onClick={() => setShowMockAlert(false)}
              className="text-blue-600 hover:text-blue-800 font-medium ml-4"
            >
              ✕
            </button>
          </AlertDescription>
        </Alert>
      )}

      <ConsumptionCards data={consumoData} />
      <AlertsSection data={consumoData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConsumptionChart data={consumoData} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

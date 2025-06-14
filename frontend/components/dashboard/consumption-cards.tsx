"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Zap, TrendingUp, TrendingDown } from "lucide-react"
import type { ConsumoData } from "@/types/consumo"

interface ConsumptionCardsProps {
  data: ConsumoData[]
}

export function ConsumptionCards({ data }: ConsumptionCardsProps) {
  const currentMonth = data[data.length - 1]
  const previousMonth = data[data.length - 2]

  const aguaVariation = previousMonth
    ? ((currentMonth?.consumoAgua - previousMonth.consumoAgua) / previousMonth.consumoAgua) * 100
    : 0

  const energiaVariation = previousMonth
    ? ((currentMonth?.consumoEnergia - previousMonth.consumoEnergia) / previousMonth.consumoEnergia) * 100
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Água Atual</CardTitle>
          <Droplets className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMonth?.consumoAgua || 0} m³</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {aguaVariation >= 0 ? (
              <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
            )}
            <span className={aguaVariation >= 0 ? "text-red-500" : "text-green-500"}>
              {Math.abs(aguaVariation).toFixed(1)}%
            </span>
            <span className="ml-1">vs mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Energia Atual</CardTitle>
          <Zap className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMonth?.consumoEnergia || 0} kWh</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {energiaVariation >= 0 ? (
              <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
            )}
            <span className={energiaVariation >= 0 ? "text-red-500" : "text-green-500"}>
              {Math.abs(energiaVariation).toFixed(1)}%
            </span>
            <span className="ml-1">vs mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média Água</CardTitle>
          <Droplets className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.length > 0 ? (data.reduce((acc, item) => acc + item.consumoAgua, 0) / data.length).toFixed(1) : 0} m³
          </div>
          <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média Energia</CardTitle>
          <Zap className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.length > 0 ? (data.reduce((acc, item) => acc + item.consumoEnergia, 0) / data.length).toFixed(1) : 0}{" "}
            kWh
          </div>
          <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
        </CardContent>
      </Card>
    </div>
  )
}

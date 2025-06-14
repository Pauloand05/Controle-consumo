"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { ConsumoData } from "@/types/consumo"

interface ConsumptionChartProps {
  data: ConsumoData[]
}

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  const chartData = data.map((item) => ({
    mes: `${item.mes}/${item.ano}`,
    agua: item.consumoAgua,
    energia: item.consumoEnergia,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo dos Últimos 6 Meses</CardTitle>
        <CardDescription>Comparativo entre consumo de água (m³) e energia elétrica (kWh)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="agua" stroke="#3B82F6" strokeWidth={2} name="Água (m³)" />
            <Line type="monotone" dataKey="energia" stroke="#F59E0B" strokeWidth={2} name="Energia (kWh)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

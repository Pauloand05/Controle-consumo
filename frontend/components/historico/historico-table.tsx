"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { consumoService } from "@/services/consumo-service"
import type { ConsumoData } from "@/types/consumo"

export function HistoricoTable() {
  const [data, setData] = useState<ConsumoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historico = await consumoService.getHistorico()
        setData(historico)
      } catch (error) {
        console.error("Erro ao carregar histórico:", error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getVariationIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp className="h-4 w-4 text-red-500" />
    if (variation < 0) return <TrendingDown className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getVariationColor = (variation: number) => {
    if (variation > 0) return "text-red-600 bg-red-50"
    if (variation < 0) return "text-green-600 bg-green-50"
    return "text-gray-600 bg-gray-50"
  }

  const calculateVariation = (current: number, previous: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Carregando histórico...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum registro encontrado.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Período</TableHead>
            <TableHead>Água (m³)</TableHead>
            <TableHead>Variação Água</TableHead>
            <TableHead>Energia (kWh)</TableHead>
            <TableHead>Variação Energia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const previousItem = data[index - 1]
            const aguaVariation = previousItem ? calculateVariation(item.consumoAgua, previousItem.consumoAgua) : 0
            const energiaVariation = previousItem
              ? calculateVariation(item.consumoEnergia, previousItem.consumoEnergia)
              : 0

            return (
              <TableRow key={`${item.mes}-${item.ano}`}>
                <TableCell className="font-medium">
                  {String(item.mes).padStart(2, "0")}/{item.ano}
                </TableCell>
                <TableCell>{item.consumoAgua.toFixed(2)}</TableCell>
                <TableCell>
                  {index > 0 && (
                    <Badge variant="outline" className={getVariationColor(aguaVariation)}>
                      <div className="flex items-center gap-1">
                        {getVariationIcon(aguaVariation)}
                        {Math.abs(aguaVariation).toFixed(1)}%
                      </div>
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{item.consumoEnergia.toFixed(2)}</TableCell>
                <TableCell>
                  {index > 0 && (
                    <Badge variant="outline" className={getVariationColor(energiaVariation)}>
                      <div className="flex items-center gap-1">
                        {getVariationIcon(energiaVariation)}
                        {Math.abs(energiaVariation).toFixed(1)}%
                      </div>
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

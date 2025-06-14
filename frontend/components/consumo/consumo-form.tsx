"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { consumoService } from "@/services/consumo-service"

export function ConsumoForm() {
  const [formData, setFormData] = useState({
    mes: "",
    ano: new Date().getFullYear().toString(),
    consumoAgua: "",
    consumoEnergia: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await consumoService.create({
        mes: Number.parseInt(formData.mes),
        ano: Number.parseInt(formData.ano),
        consumoAgua: Number.parseFloat(formData.consumoAgua),
        consumoEnergia: Number.parseFloat(formData.consumoEnergia),
      })

      setSuccess(true)

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Erro ao registrar consumo:", error)
      alert("Erro ao registrar consumo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const meses = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ]

  const anos = Array.from({ length: 5 }, (_, i) => {
    const ano = new Date().getFullYear() - i
    return { value: ano.toString(), label: ano.toString() }
  })

  if (success) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Consumo registrado com sucesso! Redirecionando para o dashboard...
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mes">Mês</Label>
          <Select value={formData.mes} onValueChange={(value) => handleChange("mes", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((mes) => (
                <SelectItem key={mes.value} value={mes.value}>
                  {mes.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ano">Ano</Label>
          <Select value={formData.ano} onValueChange={(value) => handleChange("ano", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {anos.map((ano) => (
                <SelectItem key={ano.value} value={ano.value}>
                  {ano.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="consumoAgua">Consumo de Água (m³)</Label>
        <Input
          id="consumoAgua"
          type="number"
          step="0.01"
          placeholder="Ex: 15.5"
          value={formData.consumoAgua}
          onChange={(e) => handleChange("consumoAgua", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="consumoEnergia">Consumo de Energia (kWh)</Label>
        <Input
          id="consumoEnergia"
          type="number"
          step="0.01"
          placeholder="Ex: 250.75"
          value={formData.consumoEnergia}
          onChange={(e) => handleChange("consumoEnergia", e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Registrando..." : "Registrar Consumo"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={loading}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

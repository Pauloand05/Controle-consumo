"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { metasService } from "@/services/metas-service"

export function MetasForm() {
  const [formData, setFormData] = useState({
    metaAgua: "",
    metaEnergia: "",
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const metas = await metasService.getMetas()
        if (metas) {
          setFormData({
            metaAgua: metas.metaAgua.toString(),
            metaEnergia: metas.metaEnergia.toString(),
          })
        }
      } catch (error) {
        console.error("Erro ao carregar metas:", error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchMetas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await metasService.updateMetas({
        metaAgua: Number.parseFloat(formData.metaAgua),
        metaEnergia: Number.parseFloat(formData.metaEnergia),
      })
      alert("Metas atualizadas com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar metas:", error)
      alert("Erro ao atualizar metas. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="metaAgua">Meta de Consumo de Água (m³/mês)</Label>
        <Input
          id="metaAgua"
          name="metaAgua"
          type="number"
          step="0.01"
          placeholder="Ex: 20.0"
          value={formData.metaAgua}
          onChange={handleChange}
          required
        />
        <p className="text-sm text-gray-600">Defina sua meta mensal de consumo de água em metros cúbicos</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaEnergia">Meta de Consumo de Energia (kWh/mês)</Label>
        <Input
          id="metaEnergia"
          name="metaEnergia"
          type="number"
          step="0.01"
          placeholder="Ex: 300.0"
          value={formData.metaEnergia}
          onChange={handleChange}
          required
        />
        <p className="text-sm text-gray-600">Defina sua meta mensal de consumo de energia em quilowatt-hora</p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Salvando..." : "Salvar Metas"}
      </Button>
    </form>
  )
}

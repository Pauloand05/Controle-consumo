import { api } from "./api"
import type { ConsumoData } from "@/types/consumo"

// Dados mockados para desenvolvimento
const mockData: ConsumoData[] = [
  { id: 1, mes: 8, ano: 2024, consumoAgua: 15.2, consumoEnergia: 280.5 },
  { id: 2, mes: 9, ano: 2024, consumoAgua: 18.7, consumoEnergia: 320.8 },
  { id: 3, mes: 10, ano: 2024, consumoAgua: 16.3, consumoEnergia: 295.2 },
  { id: 4, mes: 11, ano: 2024, consumoAgua: 19.1, consumoEnergia: 340.7 },
  { id: 5, mes: 12, ano: 2024, consumoAgua: 22.4, consumoEnergia: 380.3 },
  { id: 6, mes: 1, ano: 2025, consumoAgua: 17.8, consumoEnergia: 310.9 },
]

class ConsumoService {
  private useMockData = true // Usar dados mockados por padrão

  // Simular delay de rede para realismo
  private async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async create(data: Omit<ConsumoData, "id">): Promise<ConsumoData> {
    if (this.useMockData) {
      await this.delay()
      const newId = Math.max(...mockData.map((d) => d.id || 0)) + 1
      const newData = { ...data, id: newId }
      mockData.push(newData)
      return newData
    }

    try {
      const response = await api.post("/consumos", data)
      return response.data
    } catch (error) {
      console.error("Erro na API, usando dados mockados:", error)
      const newId = Math.max(...mockData.map((d) => d.id || 0)) + 1
      const newData = { ...data, id: newId }
      mockData.push(newData)
      return newData
    }
  }

  async getUltimos6Meses(): Promise<ConsumoData[]> {
    if (this.useMockData) {
      await this.delay()
      console.log("Carregando dados mockados dos últimos 6 meses")
      return [...mockData].slice(-6)
    }

    try {
      const response = await api.get("/consumos/ultimos-6-meses")
      return response.data
    } catch (error) {
      console.error("Erro na API, usando dados mockados:", error)
      return [...mockData].slice(-6)
    }
  }

  async getHistorico(): Promise<ConsumoData[]> {
    if (this.useMockData) {
      await this.delay()
      console.log("Carregando histórico mockado")
      return [...mockData].sort((a, b) => {
        if (a.ano !== b.ano) return b.ano - a.ano
        return b.mes - a.mes
      })
    }

    try {
      const response = await api.get("/consumos/historico")
      return response.data
    } catch (error) {
      console.error("Erro na API, usando dados mockados:", error)
      return [...mockData].sort((a, b) => {
        if (a.ano !== b.ano) return b.ano - a.ano
        return b.mes - a.mes
      })
    }
  }

  async getById(id: number): Promise<ConsumoData> {
    if (this.useMockData) {
      await this.delay()
      const found = mockData.find((d) => d.id === id)
      if (found) return found
      throw new Error("Consumo não encontrado")
    }

    try {
      const response = await api.get(`/consumos/${id}`)
      return response.data
    } catch (error) {
      const found = mockData.find((d) => d.id === id)
      if (found) return found
      throw error
    }
  }

  async update(id: number, data: Partial<ConsumoData>): Promise<ConsumoData> {
    if (this.useMockData) {
      await this.delay()
      const index = mockData.findIndex((d) => d.id === id)
      if (index !== -1) {
        mockData[index] = { ...mockData[index], ...data }
        return mockData[index]
      }
      throw new Error("Consumo não encontrado")
    }

    try {
      const response = await api.put(`/consumos/${id}`, data)
      return response.data
    } catch (error) {
      const index = mockData.findIndex((d) => d.id === id)
      if (index !== -1) {
        mockData[index] = { ...mockData[index], ...data }
        return mockData[index]
      }
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    if (this.useMockData) {
      await this.delay()
      const index = mockData.findIndex((d) => d.id === id)
      if (index !== -1) {
        mockData.splice(index, 1)
        return
      }
      throw new Error("Consumo não encontrado")
    }

    try {
      await api.delete(`/consumos/${id}`)
    } catch (error) {
      const index = mockData.findIndex((d) => d.id === id)
      if (index !== -1) {
        mockData.splice(index, 1)
        return
      }
      throw error
    }
  }

  // Método para alternar entre mock e API real
  setUseMockData(useMock: boolean) {
    this.useMockData = useMock
  }
}

export const consumoService = new ConsumoService()

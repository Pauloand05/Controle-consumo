import { api } from "./api"
import type { MetaData } from "@/types/meta"

// Dados mockados para desenvolvimento
let mockMetas: MetaData = {
  id: 1,
  metaAgua: 20.0,
  metaEnergia: 350.0,
}

class MetasService {
  private useMockData = true // Usar dados mockados por padrão

  private async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getMetas(): Promise<MetaData> {
    if (this.useMockData) {
      await this.delay()
      console.log("Carregando metas mockadas")
      return { ...mockMetas }
    }

    try {
      const response = await api.get("/metas")
      return response.data
    } catch (error) {
      console.error("Erro na API, usando metas mockadas:", error)
      return { ...mockMetas }
    }
  }

  async updateMetas(data: Omit<MetaData, "id">): Promise<MetaData> {
    if (this.useMockData) {
      await this.delay()
      console.log("Atualizando metas mockadas:", data)
      mockMetas = { ...mockMetas, ...data }
      return { ...mockMetas }
    }

    try {
      const response = await api.put("/metas", data)
      return response.data
    } catch (error) {
      console.error("Erro na API, usando metas mockadas:", error)
      mockMetas = { ...mockMetas, ...data }
      return { ...mockMetas }
    }
  }

  setUseMockData(useMock: boolean) {
    this.useMockData = useMock
  }
}

export const metasService = new MetasService()

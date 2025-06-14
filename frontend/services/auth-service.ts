export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  nome: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    nome: string
    email: string
  }
}

class AuthService {
  private useMockData = true // Usar dados mockados por padrão

  private async delay(ms = 800) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async login(data: LoginData): Promise<AuthResponse> {
    if (this.useMockData) {
      await this.delay()
      console.log("Login mockado para:", data.email)

      const mockAuth: AuthResponse = {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: 1,
          nome: "Usuário Teste",
          email: data.email,
        },
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", mockAuth.token)
        localStorage.setItem("user", JSON.stringify(mockAuth.user))
      }

      return mockAuth
    }

    // Código da API real aqui quando necessário
    throw new Error("API não implementada")
  }

  async register(data: RegisterData): Promise<void> {
    if (this.useMockData) {
      await this.delay()
      console.log("Registro mockado para:", data.email)
      return
    }

    // Código da API real aqui quando necessário
    throw new Error("API não implementada")
  }

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  }

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token")
    }
    return false
  }

  setUseMockData(useMock: boolean) {
    this.useMockData = useMock
  }
}

export const authService = new AuthService()

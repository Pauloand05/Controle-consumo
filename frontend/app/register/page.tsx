import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Criar nova conta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Cadastre-se para acessar o sistema</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

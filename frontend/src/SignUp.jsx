import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { User, Mail, Lock } from "lucide-react"

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Signup failed")
      }

      alert("Inscription réussie ! Veuillez vous connecter.")
      navigate("/login")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF5F0]">
      {/* Top banner */}
      <div className="bg-[#8b6240] text-white py-2 text-center">
        <p>Jusqu'à -50% sur une sélection produit</p>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-gray-600">
              Déjà client ?{" "}
              <Link to="/login" className="text-[#8b6240] hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#8b6240] focus:ring-[#8b6240]"
                  required
                />
                <span className="text-sm text-gray-600">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-[#8b6240] hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/privacy" className="text-[#8b6240] hover:underline">
                    politique de confidentialité
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8b6240] text-white rounded-lg hover:bg-[#725032] transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp


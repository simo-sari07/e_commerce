import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff, ArrowLeft } from "lucide-react"

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })
  const [message, setMessage] = useState({ type: "", content: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: "", content: "" })

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "error",
        content: "Les mots de passe ne correspondent pas",
      })
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setMessage({
        type: "success",
        content: "Mot de passe modifié avec succès",
      })

      // Clear form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/profile")
      }, 2000)
    } catch (error) {
      setMessage({
        type: "error",
        content: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF5F0]">
      {/* Top banner */}
      <div className="bg-[#8b6240] text-white py-2 text-center text-sm">
        <p>Jusqu'à -50% sur une sélection produit</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center text-[#8b6240] hover:text-[#725032] mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour au profil
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Changer le mot de passe</h2>

          {message.content && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5" />
              )}
              <p>{message.content}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showPasswords.old ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.old ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#8b6240] text-white rounded-lg hover:bg-[#725032] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Modification..." : "Modifier le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword


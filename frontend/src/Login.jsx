import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from 'lucide-react';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      setUser({ email: formData.email });
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5F0]">
 
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="mt-2 text-sm text-gray-600">
              Nouveau client ?{" "}
              <Link to="/signup" className="text-[#8b6240] hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                  required
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link to="/forgot-password" className="text-sm text-[#8b6240] hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                />
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8b6240] text-white rounded-lg hover:bg-[#725032] transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

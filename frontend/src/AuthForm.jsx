import { Link } from "react-router-dom"

const AuthForm = ({ title, onSubmit, fields, submitText, alternativeText, alternativeLink, alternativeLinkText }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7e7d3] to-[#e6c9a8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#8b6240]">{title}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {fields.map((field, index) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="sr-only">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b6240] focus:border-[#8b6240] focus:z-10 sm:text-sm ${
                    index === 0 ? "rounded-t-md" : index === fields.length - 1 ? "rounded-b-md" : ""
                  }`}
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8b6240] hover:bg-[#a67c52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b6240]"
            >
              {submitText}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          {alternativeText}{" "}
          <Link to={alternativeLink} className="font-medium text-[#8b6240] hover:text-[#a67c52]">
            {alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm


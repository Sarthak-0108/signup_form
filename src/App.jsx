import  { useState } from 'react';
import { useForm } from '@tanstack/react-form';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      terms: false,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('Submitted values:', value);
      setSubmittedSuccess(true);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-lg p-7 sm:p-8 shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1.5">Create an account</h1>
          <p className="text-sm text-slate-500">Enter your details to get started</p>
        </div>

        {submittedSuccess && (
          <div className="mb-4 p-3 rounded-md text-sm text-green-700 bg-green-50 border border-green-200 text-center">
            Account created successfully! Welcome aboard.
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          noValidate
        >
          {/* Full Name Field */}
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) => (!value.trim() ? 'Full name is required.' : undefined),
            }}
          >
            {(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="mb-5 flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-semibold text-slate-900 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-3.5 py-3 text-base border rounded-md outline-none transition-colors duration-150 ${
                      hasError
                        ? 'border-red-600 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                  {hasError && (
                    <span className="text-xs text-red-600 mt-1.5">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Email Address Field */}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) return 'Email address is required.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email.';
                return undefined;
              },
            }}
          >
            {(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="mb-5 flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-semibold text-slate-900 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-3.5 py-3 text-base border rounded-md outline-none transition-colors duration-150 ${
                      hasError
                        ? 'border-red-600 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                  {hasError && (
                    <span className="text-xs text-red-600 mt-1.5">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Password is required.';
                if (value.length < 8) return 'Password must be at least 8 characters.';
                return undefined;
              },
            }}
          >
            {(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="mb-5 flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-semibold text-slate-900 mb-1.5">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`w-full px-3.5 py-3 pr-14 text-base border rounded-md outline-none transition-colors duration-150 ${
                        hasError
                          ? 'border-red-600 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                          : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-xs font-semibold text-blue-600 hover:text-blue-700 select-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {hasError && (
                    <span className="text-xs text-red-600 mt-1.5">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Terms Checkbox */}
          <form.Field
            name="terms"
            validators={{
              onChange: ({ value }) => (!value ? 'You must accept the terms to proceed.' : undefined),
            }}
          >
            {(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="mb-6">
                  <div className="flex items-start gap-2">
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <label htmlFor={field.name} className="text-sm text-slate-500 leading-relaxed">
                      I agree to the{' '}
                      <a href="#terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                  {hasError && (
                    <span className="text-xs text-red-600 mt-1.5 block">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Submit Button */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md text-base transition-colors duration-150"
              >
                {isSubmitting ? 'Creating account...' : 'Sign Up'}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
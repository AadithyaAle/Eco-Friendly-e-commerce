export default function Account() {
  return (
    <div className="animate-fade-in-up w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-rvo-dark mb-2">
          Profile Settings
        </h1>
        <p className="text-rvo-dark-light">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Personal Details */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-rvo-dark border-b border-gray-100 pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-rvo-dark">First Name</label>
              <div className="h-11 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-rvo-dark">Last Name</label>
              <div className="h-11 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-rvo-dark">Email Address</label>
              <div className="h-11 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
          </div>
          <button className="btn-primary w-auto inline-flex px-8">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

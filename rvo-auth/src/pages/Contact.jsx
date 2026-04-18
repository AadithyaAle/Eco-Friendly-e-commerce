export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 animate-fade-in-up w-full">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-rvo-dark mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-rvo-dark-light">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="w-full bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-14 bg-gray-50 rounded-xl w-full border border-gray-100" />
            <div className="h-14 bg-gray-50 rounded-xl w-full border border-gray-100" />
          </div>
          <div className="h-14 bg-gray-50 rounded-xl w-full border border-gray-100" />
          <div className="h-32 bg-gray-50 rounded-xl w-full border border-gray-100" />
          <div className="h-14 bg-gray-200 rounded-xl w-1/3 mt-4" />
        </div>
      </div>
    </div>
  );
}

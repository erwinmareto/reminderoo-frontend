export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:col-span-12">
      <h6 className="font-semibold text-primary-80 text-heading-6 mb-4">My Profile</h6>
      <section className="bg-primary-0 gap-8 p-9 rounded-lg lg:grid lg:grid-cols-12">
        {children}
      </section>
    </div>
  );
}
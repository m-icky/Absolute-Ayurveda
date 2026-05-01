export const metadata = {
  title: "Admin Panel | Absolute Ayurveda",
  description: "Admin Panel for Absolute Ayurveda",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout min-h-screen bg-cream font-lato">
      {children}
    </div>
  );
}

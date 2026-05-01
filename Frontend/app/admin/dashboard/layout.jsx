import DashboardWrapper from "../../../components/admin/DashboardWrapper";

export const metadata = {
  title: "Dashboard | Admin Panel",
  description: "Absolute Ayurveda Admin Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}

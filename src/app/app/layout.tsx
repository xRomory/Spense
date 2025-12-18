import React from "react";
import { SpenseLayout } from "./_components/spense-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spense Dashboard",
  description: "Main Dashboard",
}

const AppLayout = ({children}: { children: React.ReactNode }) => {
  return <SpenseLayout>{children}</SpenseLayout>
}

export default AppLayout;
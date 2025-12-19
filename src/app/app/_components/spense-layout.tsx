import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import SpenseHeader from "./header";
import SpenseLogo from "@/components/logo";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <SpenseLogo />
        <SpenseHeader />

        {/* Group Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

function Fallback({ error }: { error: Error }) {
  return <p>Error: {error.message ?? "Something went wrong!"}</p>;
}

export const SpenseLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={Fallback}>
        {children}
      </ErrorBoundary>
    </Layout>
  )
}

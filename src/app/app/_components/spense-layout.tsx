"use client";

import { ErrorBoundary } from "react-error-boundary";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <main>{children}</main>
    </div>
  );
};

function Fallback({ error }: { error: Error }) {
  return <p>Error: {error.message ?? "Something went wrong!"}</p>;
}

export const SpenseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
    </Layout>
  );
};

// src/App.jsx
import Pages from "@/pages/index.jsx";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <>
      <Pages />
      <Toaster />
    </>
  );
}

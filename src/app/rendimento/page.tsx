import { Suspense } from "react";
import RendimentoContent from "@/components/RendimentoContent";

const RendimentoPage = () => {
  return (
    <main className="p-8 md:py-20 md:px-30 bg-white">
      <Suspense
        fallback={
          <div className="bg-gray-50 flex items-center justify-center p-8">
            <div>Carregando...</div>
          </div>
        }
      >
        <RendimentoContent />
      </Suspense>
    </main>
  );
};

export default RendimentoPage;

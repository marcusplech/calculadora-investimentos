import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className="bg-white w-full h-[97px] py-[32px] px-8 lg:px-[120px] shadow-sm border-b border-gray-200"
      role="banner"
    >
      <Link href="/" aria-label="Voltar para a página inicial">
        <Image
          src="/logo-grupo-primo.svg"
          alt="Grupo Primo - Logotipo"
          width={176}
          height={32}
          priority
        />
      </Link>
    </header>
  );
};

export default Header;

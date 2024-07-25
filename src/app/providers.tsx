'use client';

import { PrimeReactProvider } from 'primereact/api';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/lara-dark-cyan/theme.css";

import "primereact/resources/themes/lara-light-teal/theme.css"
// import "primereact/resources/themes/lara-dark-teal/theme.css"

export function Providers({ children }) {
    console.log("children", children)
  return (
    <PrimeReactProvider>
        {children}
    </PrimeReactProvider>
  );
}
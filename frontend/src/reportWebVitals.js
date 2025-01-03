// functie pt monitorizarea performantelor aplicatiei
const reportWebVitals = (onPerfEntry) => {
  // verifica daca `onPerfEntry` este o functie valida
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // importa libraria `web-vitals` la cerere
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // apeleaza functiile de masurare a performantelor si transmite rezultatele catre `onPerfEntry`
      getCLS(onPerfEntry) // masurare cumulative layout shift
      getFID(onPerfEntry) // masurare first input delay
      getFCP(onPerfEntry) // masurare first contentful paint
      getLCP(onPerfEntry) // masurare largest contentful paint
      getTTFB(onPerfEntry) // masurare time to first byte
    })
  }
}

// exporta functia pt utilizare in aplicatie
export default reportWebVitals

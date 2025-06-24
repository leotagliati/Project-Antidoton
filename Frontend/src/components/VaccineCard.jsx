function VaccineCard({name}) {
  return (
    <div>
        <div>
            <h2>Nome: {name || 'jonas'}</h2>
            <h3>Vacinas:</h3>
            <ul>
            <li>COVID-19 - 1ª Dose - 2023-05-10</li>
            <li>Hepatite B - 2ª Dose - 2023-06-20</li>
            </ul>
        </div>
    </div>
  )
}

export default VaccineCard;
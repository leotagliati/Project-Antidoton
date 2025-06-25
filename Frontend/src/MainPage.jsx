import React from 'react'
import VaccineCard from './VaccineCard'

export const MainPage = () => {
    const mockName = 'defaultUser'; // Mock username for testing
    return (
        <>
            <VaccineCard name={mockName}></VaccineCard>
        </>
    )
}

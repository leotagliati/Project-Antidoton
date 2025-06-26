import { useEffect, useState } from 'react';
import clientVaccines from '../utils/clientVaccines';

const useVaccinations = (username, activeSheet, searchTerm) => {
    const [vaccinations, setVaccinations] = useState([]);
    const [allVaccines, setAllVaccines] = useState([]);

    const fetchVaccinationsByTerm = async () => {
        try {
            const url = searchTerm.trim() !== ''
                ? '/vaccinations/search'
                : '/vaccinations';
            const params = searchTerm.trim() !== ''
                ? { vaccineName: searchTerm }
                : {};

            const response = await clientVaccines.get(url, { params });
            setVaccinations(response.data);
        } catch {
            setVaccinations([]);
        }
    };

    const fetchAllVaccines = async () => {
        try {
            const response = await clientVaccines.get('/vaccines');
            setAllVaccines(response.data);
        } catch {}
    };

    useEffect(() => {
        if (activeSheet === 'vaccinations') {
            const debounce = setTimeout(() => fetchVaccinationsByTerm(), 500);
            return () => clearTimeout(debounce);
        }
    }, [searchTerm, username, activeSheet]);

    return {
        vaccinations,
        allVaccines,
        setVaccinations,
        fetchVaccinationsByTerm,
        fetchAllVaccines
    };
};

export default useVaccinations;

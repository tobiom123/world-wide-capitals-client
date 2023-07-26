import axios from '@/lib/axios'

const makeRequest = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await axios.request({
            url: endpoint,
            method,
            data
        });
        
        return response.data;
    } catch (error) {

        console.log('ERROROROROROROR');
        throw error;
    }
}

const getCountriesData = async () => makeRequest('/api/countries');

export default {
    getCountriesData
}
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import api from '@/services/api';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [countries, setCountries] = useState(null);
    const [randomCountryOptions, setRandomCountryOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCapital, setSelectedCapital] = useState(null);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await api.getCountriesData();
                setCountries(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('There was an issue retrieving countries data');
                setIsLoading(false);
            }
        };

        getCountries();
    }, []);

    const getRandomItem = array => {
        if (!Array.isArray(array) || array.length === 0) return null;

        return array[Math.floor(Math.random() * array.length)];
    };

    const getRandomCountryOptions = array => {
        if (!Array.isArray(array) || array.length === 0) return [];

        let options = [];

        for (let i = 0; i < 3; i++) {
            options.push(getRandomItem(array));
        }

        //Assigning qna property to a random option, this will be the country whose capital is enquired
        options[Math.floor(Math.random() * 3)].qna = true;

        return options;
    };

    const qnaOption = randomCountryOptions.find(option => option.qna);

    useEffect(() => {
        const randomCountryOptions = getRandomCountryOptions(countries);
        setRandomCountryOptions(randomCountryOptions);
    }, [countries]);

    const handleCapitalSelection = capital => {
        setSelectedCapital(capital);
    };

    const handleTryAnother = () => {
        const newRandomCountryOptions = getRandomCountryOptions(countries);

        setRandomCountryOptions(newRandomCountryOptions);
        setSelectedCapital(null);
    };

    if (isLoading) {
        return <div className="flex justify-center">Loading...</div>;
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    World Wide Capitals
                </h2>
            }>
            <Head>
                <title>World Wide Capitals - Dashboard</title>
            </Head>

            <div className="py-10">
                {error ? (
                    <div className="flex justify-center">Error: {error}</div>
                ) : (
                    <div className="max-w-10xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <h1 className="text-6xl text-center">
                                What's the capital of {qnaOption?.name}?
                            </h1>
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div className="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
                                    <div className="relative flex flex-col items-center">
                                        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                                            {randomCountryOptions?.map(
                                                (option, index) => (
                                                    <button
                                                        key={index}
                                                        className={`${selectedCapital ===
                                                                option.capital &&
                                                                option.qna
                                                                ? 'bg-green-500'
                                                                : selectedCapital ===
                                                                    option.capital &&
                                                                    !option.qna
                                                                    ? 'bg-red-500'
                                                                    : 'bg-gray-400'
                                                            } text-white px-4 py-2 m-2`}
                                                        onClick={() =>
                                                            handleCapitalSelection(
                                                                option.capital,
                                                            )
                                                        }>
                                                        <Card
                                                            key={index}
                                                            className="flex-shrink-0">
                                                            <CardHeader></CardHeader>
                                                            <CardContent>
                                                                <h1 className="text-6xl">
                                                                    {option.capital
                                                                        ? option.capital
                                                                        : 'No capital'}
                                                                </h1>
                                                            </CardContent>
                                                            <CardFooter></CardFooter>
                                                        </Card>
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 mt-4"
                                                onClick={handleTryAnother}>
                                                Try Another
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Dashboard;

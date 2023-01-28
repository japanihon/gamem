/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const getRandomPage = () => Math.round(Math.random() * (10 - 1) + 1);

const useGetImages = gameOptions => {
    const [images, setImages] = useState([]);

    const buildUrl = () => {
        let url = new URL('https://api.pexels.com/v1/search');

        url.search = new URLSearchParams({
            query: gameOptions.category,
            orientation: 'square',
            size: 'small',
            per_page: gameOptions.cardsCount / 2,
            page: getRandomPage(),
        });

        return url;
    };

    const fetchPics = () => {
        fetch(buildUrl(), {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: process.env.REACT_APP_AUTH_KEY,
            },
        })
            .then(data => data.json())
            .then(data => setImages(data.photos));
    };

    useEffect(() => {
        if (!gameOptions) return;
        fetchPics();
    }, [fetchPics, gameOptions]);

    return images;
};

export default useGetImages;

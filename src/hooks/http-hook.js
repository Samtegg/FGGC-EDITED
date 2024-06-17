import {useState, useCallback, useRef, useEffect} from 'react';
import { toast } from 'react-toastify'
// import { images } from '../assets';

export const useHttpClient = () => {
    const [isLoading,
        setIsLoading] = useState(false);
    const [error,
        setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests
            .current
            .push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers: {
                    ...headers
                },
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests
                .current
                .filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                // toast.error(responseData.message, {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
                throw new Error(responseData.message);

            }
            setIsLoading(false);

            toast.success(responseData.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // icon: ({theme, type}) =>  <img src={images.successIcon.src} alt={images.successIcon.alt} className="w-16 h-8"/>
                });

            return responseData;
        } catch (err) {

            if (!window.navigator.onLine){
                setIsLoading(false);

                toast.error("Please kindly check your network connection", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                throw new Error("Please kindly check your network connection");
            }


            
            setError(err.message);
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
            setIsLoading(false);

            
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests
                .current
                .forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {isLoading, error, sendRequest, clearError};
};

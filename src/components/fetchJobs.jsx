import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://findwork.dev/api/jobs.json'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
}

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }

        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }

        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }

        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
        
        default:
            return state;
    }
}


const FetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        const requestCancelToken = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            cancelToken: requestCancelToken.token, 
            headers: {
                Authorization: 'dbd59d70544ce4b2f2332f4050c319253e0f8ee6'
            },
            params: {
                markdown: true, 
                page: page,
                ...params
            }
        }).then( res => {
            dispatch({ type:ACTIONS.GET_DATA, payload: { jobs: res.data }})
        }).catch(e => {
            if(axios.isCancel(e))
                return  //ignore and return nothing
            dispatch({ type:ACTIONS.ERROR, payload: { error: e }})
        })


        //check for next page
        const nextPageCancelToken  = axios.CancelToken.source();
        axios.get(BASE_URL, {
            cancelToken: nextPageCancelToken.token, 
            headers: {
                Authorization: 'dbd59d70544ce4b2f2332f4050c319253e0f8ee6'
            },
            params: {
                markdown: true, 
                page: page+1,
                ...params
            }
        }).then( res => {
            dispatch({ type:ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0}})
        }).catch(e => {
            if(axios.isCancel(e))
                return  //ignore and return nothing
            dispatch({ type:ACTIONS.ERROR, payload: { error: e }})
        })

        return () => {
            requestCancelToken.cancel();
            nextPageCancelToken.cancel();
        }
    }, [ params, page])

    return state;
}

export default FetchJobs;
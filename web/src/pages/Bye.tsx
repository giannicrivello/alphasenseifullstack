import React from 'react';
import { useByeQuery } from '../generated/graphql';

interface Props {

}


//this is the protected route, auth is done server side
// with use bye query
export const Bye: React.FC<Props> = () => {
    const {data, loading, error} = useByeQuery({
        fetchPolicy: "network-only"
    })


    if (loading) {
        return <div>loading</div>
    }

    if (error) {
        console.log(error)
        return <div>err</div>
    }

    if(!data) {
        return <div>no data to show</div>
    }
    return (
        <div>{data.bye}</div>
    )
}
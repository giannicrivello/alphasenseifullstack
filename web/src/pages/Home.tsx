import React from 'react';
import { Link } from 'react-router-dom';
import { useUsersQuery } from '../generated/graphql';

interface Props {

}

export const Home: React.FC<Props> = () => {
    const { data } = useUsersQuery({ fetchPolicy: 'network-only'});

    if (!data) {
        return <div>...loading</div>
    }
    return (
            <div>
                <div>Users</div>
                <ul>
                    {data.users.map(x => {
                        //key is important when mapping over an array in react
                        return <li key={x.id}>{x.email}. {x.id}</li>
                    })}
                </ul>
                
            </div>
        );
}
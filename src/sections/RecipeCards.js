import React from 'react';
import { Header } from 'flotiq-components-react';
import RecipeCard from '../components/RecipeCard';

const RecipeCards = ({ popups, headerText }) => (
    <div className="max-w-7xl mt-6 mb-6 mx-auto px-4 py-4 sm:px-6 lg:px-8 xl:px-0">
        <Header additionalClasses={['basis-1 mb-10 !text-4xl !font-medium']}>
            {headerText}
        </Header>
        <div className="flex flex-wrap justify-start">
            {popups.map((popup, index) => (
                <RecipeCard
                    key={index}
                    id={popup.id} 
                    title={popup.title} 
                    thumbnail={popup.thumbnail[0]?.localFile} 
                    start_date={popup.start_date} 
                    end_date={popup.end_date} 
                    address={popup.address} 
                    tags={popup.tags}
                />
            ))}
        </div>
    </div>
);

export default RecipeCards;

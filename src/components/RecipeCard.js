import React from 'react';
import { Link } from 'gatsby';
import { Card } from 'flotiq-components-react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const CustomRecipeCard = ({ id, title, thumbnail, start_date, end_date, address, tags }) => {
    return(
    
        <Card
            bordered={false}
            additionalClasses={['mb-4 cursor-pointer basis-full md:basis-1/2 lg:basis-1/3 px-2 !bg-transparent']}
        >
            <Link to={`/${id}`}>
                <GatsbyImage
                    image={getImage(thumbnail)}
                    alt={title}
                    className="w-full"
                />
            </Link>
            <Card.Body
                additionalClasses={[
                    'flex flex-col items-start justify-between order-2 lg:order-1 px-5 pt-10 pb-2 border-b-4 bg-white',
                ]}
            >
                <Link to={`/${id}`}>
                    <div className="flex flex-wrap justify-start text-xs font-light space-x-5 pb-3">
                        <p className="px-4 py-2 bg-light-gray">
                            일정:
                            {' '}
                            <span className="font-semibold text-sm">{`${start_date.split("-")[1]}.${start_date.split("-")[2]}-${end_date.split("-")[1]}.${end_date.split("-")[2]}`}</span>
                        </p>
                        <p className="px-4 py-2 bg-light-gray">
                            위치:
                            {' '}
                            <span className="font-semibold text-sm">{`${address.split(" ")[0]} ${address.split(" ")[1]}`}</span>
                        </p>
                    </div>
                    <Card.Title additionalClasses={['font-normal']}>
                        {title}
                    </Card.Title>
                </Link>
                 <div className="flex flex-wrap justify-start text-sm font-light mt-5"> 
                    {tags && tags.map((tag) => ( 
                        <a 
                            href="/" 
                            className="mr-5 my-1 py-2 inline-flex items-center justify-center 
                            rounded-md underline text-xs font-light hover:text-secondary" 
                        > 
                            #{tag.name} 
                        </a> 
                    ))}
                 </div> 
            </Card.Body>
        </Card>
    )
};

export default CustomRecipeCard;

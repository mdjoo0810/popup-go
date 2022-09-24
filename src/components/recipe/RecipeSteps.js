import React from 'react';
import { Header, Paragraph } from 'flotiq-components-react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const RecipeSteps = ({ title, images }) => (
    <div className='py-6'> 
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div className="w-full" key={index}>
                    {image && image
                    && (
                        <GatsbyImage
                            image={getImage(image.localFile)}
                            alt={title}
                            className="w-full pb-5 md:pb-10"
                        />
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default RecipeSteps;

import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Button } from 'flotiq-components-react';
import { Link } from 'gatsby';
import Layout from '../layouts/layout';

const NotFoundPage = () => (
    <Layout additionalClass={['bg-light-gray']}>
        <Helmet>
            <title>Page not found</title>
        </Helmet>
        <div className="py-32">
            <Header additionalClasses={['basis-1 mb-10 !text-5xl !font-medium text-center']}>
                요청하신 페이지가 없습니다 🥲
            </Header>
            <div className="text-center mt-5 pt-5">
                {/* Example usage of button */}
                <Link to="/">
                    <Button label="홈으로 돌아가기" />
                </Link>
            </div>
        </div>
    </Layout>
);

export default NotFoundPage;

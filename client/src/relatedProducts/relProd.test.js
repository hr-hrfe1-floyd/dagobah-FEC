import React from 'react';
import axios from 'axios';
import RelatedProductsWrapper from './RelatedProducts.jsx';
import { render, screen } from '@testing-library/react';

jest.mock('axios');

describe('RelatedProducts', () => {
  test('should get related products', async () => {
    // const id = 19089;
    const mockData = {
      data: [ 19090, 19091, 19096, 19095]
    };
    const currentProduct = {
      'id': 19089,
      'campus': 'hr-rfe',
      'name': 'Camo Onesie',
      'slogan': 'Blend in to your crowd',
      'description': 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      'category': 'Jackets',
      'default_price': '140.00',
      'created_at': '2021-02-23T19:24:34.450Z',
      'updated_at': '2021-02-23T19:24:34.450Z',
      'features': [
        {
          'feature': 'Fabric',
          'value': 'Canvas'
        },
        {
          'feature': 'Buttons',
          'value': 'Brass'
        }
      ]
    };

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockData })
    );
    render(<RelatedProductsWrapper
      product_id={19089}
      product={currentProduct}/>);

    expect(await screen.findByText(/Sunglasses/)).toBeInTheDocument();
  });

});

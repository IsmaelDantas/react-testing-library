import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa se a página contém as informações da "Page Not Found"', () => {
  it('1 - A página contém um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('2 - A página carrega a foto da URL esperada', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

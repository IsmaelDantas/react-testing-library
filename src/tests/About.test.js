import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa se a página contém as informações sobre a Pokedéx', () => {
  it('1 - A página contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      name: /About Pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('2 - A página contém dois parágrafos com texto sobre Pokédex', () => {
    renderWithRouter(<About />);
    const p1a = 'One can filter Pokémons by type, ';
    const p1b = 'and see more details for each one of them';
    const p2a = 'This application simulates a Pokédex, a digital ';
    const p2b = 'encyclopedia containing all Pokémons';
    const paragraph1 = screen.getByText(p1a + p1b);
    const paragraph2 = screen.getByText(p2a + p2b);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('3 - A página contém a imagem da URL declarada', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

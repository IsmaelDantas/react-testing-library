import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se a página contém as informações sobre os Pòkemons Favoritos', () => {
  it('1 - A página exibe uma mensagem quando nenhum pokemón for favorito', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favorite);
    const notFound = screen.getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();
  });

  it('2 - A página carrega os Pokemóns marcados como favoritos', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    userEvent.click(details);
    const favorited = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favorited);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favorite);
    const favoritePokemon = screen.getByText('Pikachu');

    expect(favoritePokemon).toBeInTheDocument();
  });
});

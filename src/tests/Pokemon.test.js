import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa se o card do Pokémon é carregado da forma correta', () => {
  it('1 - Testa se a imagem do Pokemon é carregada da forma correta', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img', { name: /Pikachu sprite/i });

    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  it('2 - Testa se as informações do card Pokemon são carregadas corretamente', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemon = pokemons[0];

    expect(pokemonName.innerHTML).toBe(pokemon.name);
    expect(pokemonType.innerHTML).toBe(pokemon.type);
    expect(pokemonWeight.innerHTML.split(' ')[2]).toBe(pokemon.averageWeight.value);
    expect(pokemonWeight.innerHTML.split(' ')[3]).toBe(pokemon.averageWeight
      .measurementUnit);
  });

  it('3 - Testa se o card do Pokemon carrega um link para os detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    const pokemon = pokemons[0];
    expect(pokemonLink.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
    userEvent.click(pokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const fav = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(fav).toBeInTheDocument();
    expect(fav.src).toBe('http://localhost/star-icon.svg');
    expect(fav.alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});

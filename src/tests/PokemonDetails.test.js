import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa se a página de detalhes é carregada da forma correta', () => {
  it('1 - Testa se o h2 "Pokemon Details" existe na página de detalhes ', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const pokemon = pokemons[0];
    const details = screen.getByRole('heading', { name: `${pokemon.name} Details`,
      level: 2 });
    const summary = screen.getByRole('heading', { name: /Summary/i,
      level: 2 });
    expect(details).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(summary.parentElement.lastChild).toBeInTheDocument();
    expect(summary.parentElement.lastChild.innerHTML).toBe(pokemon.summary);
  });

  it('2 - Verificar a existência dos mapas de localização', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const pokemon = pokemons[0];
    const locationH2 = screen.getByRole('heading', {
      name: `Game Locations of ${pokemon.name}`,
      level: 2 });
    const locationLenght = pokemon.foundAt.length;
    const pokemonLocation = screen.getAllByRole('img', {
      name: `${pokemon.name} location` });
    const localName1 = pokemonLocation[0].parentElement.lastChild.firstChild;
    const localName2 = pokemonLocation[1].parentElement.lastChild.firstChild;

    expect(pokemonLocation.length).toEqual(locationLenght);
    expect(pokemonLocation[0]).toBeInTheDocument();
    expect(pokemonLocation[1]).toBeInTheDocument();
    expect(pokemonLocation[0].alt).toBe(`${pokemon.name} location`);
    expect(pokemonLocation[1].alt).toBe(`${pokemon.name} location`);
    expect(pokemonLocation[0].src).toBe(`${pokemon.foundAt[0].map}`);
    expect(pokemonLocation[1].src).toBe(`${pokemon.foundAt[1].map}`);
    expect(localName1.innerHTML).toBe(`${pokemon.foundAt[0].location}`);
    expect(localName2.innerHTML).toBe(`${pokemon.foundAt[1].location}`);
    expect(locationH2).toBeInTheDocument();
  });

  it('3 - Testa se é possivel favoritar um pokemon na pagina de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const pokemon = pokemons[0];
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const star = screen.getByRole('img', {
      name: `${pokemon.name} is marked as favorite` });
    expect(star).toBeInTheDocument();
    userEvent.click(checkbox);
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    expect(star).not.toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});

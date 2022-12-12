import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se a página contém as informações da "Pokedex"', () => {
  it('1 - A página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('2 - Ao clicar no botão "Próximo pokémon" página carrega o próximo da lista', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    const poke = screen.getByText('Pikachu');
    expect(poke).toBeInTheDocument();
    userEvent.click(nextBtn);
    const nextPoke = screen.getByText('Charmander');
    expect(nextPoke).toBeInTheDocument();
    userEvent.click(nextBtn);
    const nextNextPoke = screen.getByText('Caterpie');
    expect(nextNextPoke).toBeInTheDocument();
  });

  it('3 - Verifica se os botões de Filtros estão presentes', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const expectedNumberButtons = 7;
    expect(filterBtn.length).toBe(expectedNumberButtons);
    const fireFilter = filterBtn[1];
    const resetFilter = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(fireFilter);
    const type = screen.getAllByText('Fire')[1];
    console.log(type);
    expect(type).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(type).toBeInTheDocument();
    expect(type.name).toBe(fireFilter.name);
    expect(resetFilter).toBeInTheDocument();
  });

  it('4 - Verifica se o botão "All" funciona', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();
    const fireFilter = filterBtn[2];
    const resetFilter = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(fireFilter);
    userEvent.click(resetFilter);
    expect(firstPoke).toBeInTheDocument();
  });
});

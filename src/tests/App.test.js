import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se os elementos da página App são carregados da forma correta', () => {
  it('1 - O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('2 - Ao clicar no link "Home" , a página é direcionada para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('3 - Ao clicar no link "About" , a página é direcionada para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const about = links[1];
    userEvent.click(about);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('4 - Ao clicar em "Favorite Pokemons", é direcionado para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const favorite = links[2];
    userEvent.click(favorite);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('5 - Ao entrar em uma rota inexistente, deve retornar "NotFound"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrong-way');
    const notFoundEl = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });

    expect(notFoundEl).toBeInTheDocument();
  });
});

import { Pokemon } from './Pokemon.component';
import { getComponent, partialStore } from '@/testing/shared';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonRoutes } from '@/routes/RouteConstants';

function createPokemon<T extends {}>(store: partialStore = {}, props: T = {} as T) {
  return (
    <MemoryRouter initialEntries={[`/${pokemonRoutes.base}/d7d8e752`]}>
      <Routes>
        <Route path="/pokemon/:id" element={getComponent<T>(Pokemon, store, props)} />
      </Routes>
    </MemoryRouter>
  );
}

describe('<Pokemon />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/pokemon/v1/*', {
      fixture: 'pokemon',
      delay: 500,
    }).as('getPokemonById');

    cy.intercept('PUT', '**/api/pokemon/v1/*', {}).as('editPokemon');
  });

  it('renders', () => {
    const pokemonComponent = createPokemon();
    cy.mount(pokemonComponent);

    cy.getByDataCy('pokemon-container').should('exist');

    cy.wait('@getPokemonById');
  });

  it('can open edit dialog', () => {
    const pokemonComponent = createPokemon();
    cy.mount(pokemonComponent);

    const editBtn = cy.getByDataCy('edit-btn');
    editBtn.should('exist').click();

    cy.getByDataCy('edit-pokemon-dialog').should('exist');
  });

  it('can save edits', () => {
    const pokemonComponent = createPokemon();
    cy.mount(pokemonComponent);

    cy.getByDataCy('edit-btn').click();

    cy.getByDataCy('save-pokemon-btn').should('exist').click();

    cy.wait('@editPokemon');
  });

  it('can close dialog', () => {
    const pokemonComponent = createPokemon();
    cy.mount(pokemonComponent);

    cy.getByDataCy('edit-btn').click();

    cy.getByDataCy('cancel-edit-btn').should('exist').click();

    cy.getByDataCy('edit-pokemon-dialog').should('not.exist');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeritageManagementScreen } from './HeritageManagementScreen';

describe('HeritageManagementScreen', () => {
  test('deve renderizar a gestão de herdeiros e as estatísticas iniciais', () => {
    // Cenário: A tela de gestão de herdeiros é renderizada.
    render(<HeritageManagementScreen onNavigate={() => {}} />);

    // Resultado Esperado: O título, a descrição e as estatísticas de herdeiros devem ser exibidos.
    expect(screen.getByRole('heading', { name: /gestão de herdeiros/i })).toBeInTheDocument();
    expect(screen.getByText(/total de herdeiros/i)).toBeInTheDocument();
    expect(screen.getByText(/ativos/i)).toBeInTheDocument();
    expect(screen.getByText(/pendentes/i)).toBeInTheDocument();
  });

  test('deve abrir o modal de adicionar herdeiro ao clicar no botão correspondente', async () => {
    // Cenário: O usuário clica no botão "Adicionar Herdeiro".
    render(<HeritageManagementScreen onNavigate={() => {}} />);
    
    fireEvent.click(screen.getByRole('button', { name: /adicionar herdeiro/i }));

    // Resultado Esperado: O modal deve aparecer na tela com o título correto.
    expect(await screen.findByRole('heading', { name: /adicionar novo herdeiro/i })).toBeInTheDocument();
  });

  test('deve exibir a lista de herdeiros com suas permissões', () => {
    // Cenário: A tela é renderizada com a lista de herdeiros.
    render(<HeritageManagementScreen onNavigate={() => {}} />);

    // Resultado Esperado: Os herdeiros Maria e Pedro devem estar na lista, e as permissões devem ser exibidas.
    expect(screen.getByText(/maria silva/i)).toBeInTheDocument();
    expect(screen.getByText(/pedro santos/i)).toBeInTheDocument();
    expect(screen.getByText(/ver perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/baixar memórias/i)).toBeInTheDocument();
  });

  // Teste de simulação de remoção de herdeiro (requer estado real)
  // test('deve remover um herdeiro da lista', async () => {
  //   // Cenário: O usuário clica no botão de lixeira para remover um herdeiro.
  //   const { rerender } = render(<HeritageManagementScreen onNavigate={() => {}} />);
  //   const trashButton = screen.getAllByRole('button', { name: /trash2/i })[0];

  //   fireEvent.click(trashButton);

  //   // Resultado Esperado: O herdeiro deve desaparecer da tela.
  //   expect(screen.queryByText(/maria silva/i)).not.toBeInTheDocument();
  // });
});
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegacyProfileScreen } from './LegacyProfileScreen';

describe('LegacyProfileScreen', () => {
  test('deve renderizar o header do perfil do legado', () => {
    // Cenário: A tela do perfil do legado é renderizada.
    render(<LegacyProfileScreen onNavigate={() => {}} />);

    // CORREÇÃO: Usar o nome do jogador que está no código do componente.
    expect(screen.getByRole('heading', { name: /joão silva/i })).toBeInTheDocument();
    expect(screen.getByText(/gamer apaixonado desde 1995/i)).toBeInTheDocument();
    expect(screen.getByText(/2,381 conquistas/i)).toBeInTheDocument();
    expect(screen.getByText(/4,430 horas jogadas/i)).toBeInTheDocument();
  });

  test('deve alternar entre as abas e exibir o conteúdo de "Memórias"', async () => {
    // Cenário: O usuário clica na aba "Memórias".
    render(<LegacyProfileScreen onNavigate={() => {}} />);
    
    const memoriesTab = screen.getByRole('tab', { name: /memórias/i });
    fireEvent.click(memoriesTab);

    // Resultado Esperado: O título e a descrição da seção de memórias devem aparecer.
    expect(await screen.findByRole('heading', { name: /memórias especiais/i })).toBeInTheDocument();
    expect(screen.getByText(/momentos marcantes e screenshots favoritos/i)).toBeInTheDocument();
  });

  test('deve exibir a lista de conquistas mais raras na aba padrão', () => {
    // Cenário: A tela de perfil é renderizada na aba padrão (Conquistas).
    render(<LegacyProfileScreen onNavigate={() => {}} />);

    // Resultado Esperado: A conquista "Completionista" deve estar visível.
    expect(screen.getByText(/conquistas mais raras/i)).toBeInTheDocument();
    expect(screen.getByText(/completionista/i)).toBeInTheDocument();
  });
});
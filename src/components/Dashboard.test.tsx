import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  test('deve renderizar a mensagem de boas-vindas e o resumo geral', () => {
    render(<Dashboard onNavigate={() => {}} />);

    expect(screen.getByRole('heading', { name: /bem-vindo ao seu legado digital/i })).toBeInTheDocument();
    expect(screen.getByText(/plataformas conectadas/i)).toBeInTheDocument();
    // A correção está aqui: buscamos pelo role 'heading' (para o h4) para ser mais específico
    expect(screen.getByRole('heading', { name: /conquistas/i })).toBeInTheDocument();
    expect(screen.getByText(/herdeiros/i)).toBeInTheDocument();
  });

  test('deve navegar para a tela de adicionar ativo ao clicar no botão correspondente', () => {
    const mockOnNavigate = jest.fn();
    render(<Dashboard onNavigate={mockOnNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /adicionar ativo/i }));

    expect(mockOnNavigate).toHaveBeenCalledWith('addAsset');
  });

  test('deve exibir o progresso do legado com os status corretos', () => {
    render(<Dashboard onNavigate={() => {}} />);

    expect(screen.getByText(/progresso do legado/i)).toBeInTheDocument();
    expect(screen.getByText(/perfil básico/i)).toBeInTheDocument();
    expect(screen.getByText(/completo/i)).toBeInTheDocument();
    expect(screen.getByText(/herdeiros configurados/i)).toBeInTheDocument();
    expect(screen.getByText(/pendente/i)).toBeInTheDocument();
  });
});
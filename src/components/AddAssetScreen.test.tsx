import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddAssetScreen } from './AddAssetScreen';

describe('AddAssetScreen', () => {
  test('deve renderizar a lista de plataformas disponíveis', () => {
    // Cenário: A tela de adicionar ativo é renderizada.
    render(<AddAssetScreen onNavigate={() => {}} />);

    // Resultado Esperado: Os cards das plataformas devem estar na tela.
    expect(screen.getByText(/plataformas disponíveis/i)).toBeInTheDocument();
    expect(screen.getByText(/steam/i)).toBeInTheDocument();
    expect(screen.getByText(/playstation network/i)).toBeInTheDocument();
  });

  test('deve exibir o formulário de conexão ao selecionar uma plataforma disponível', () => {
    // Cenário: O usuário clica em uma plataforma disponível.
    render(<AddAssetScreen onNavigate={() => {}} />);
    
    fireEvent.click(screen.getByText(/epic games/i));

    // Resultado Esperado: O formulário de conexão deve aparecer, com campos de nome de usuário.
    expect(screen.getByRole('heading', { name: /conectar epic games/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome de usuário/i)).toBeInTheDocument();
  });

  test('deve simular a conexão e exibir o status "Conectando..."', () => {
    // Cenário: O usuário preenche o formulário e clica em "Conectar Conta".
    jest.useFakeTimers(); // Usamos isso para controlar a simulação de tempo
    render(<AddAssetScreen onNavigate={() => {}} />);

    fireEvent.click(screen.getByText(/nintendo switch/i));
    fireEvent.change(screen.getByLabelText(/nome de usuário/i), { target: { value: 'gamer123' } });
    fireEvent.click(screen.getByRole('button', { name: /conectar conta/i }));

    // Resultado Esperado: O botão deve exibir o texto "Conectando...".
    expect(screen.getByRole('button', { name: /conectando.../i })).toBeInTheDocument();
    
    // Avança o tempo para que a simulação de conexão termine
    jest.advanceTimersByTime(2000); 
    
    // E depois o alerta de sucesso deve aparecer (na vida real seria um toast ou modal).
    // expect(window.alert).toHaveBeenCalledWith('Plataforma conectada com sucesso!');
  });
});
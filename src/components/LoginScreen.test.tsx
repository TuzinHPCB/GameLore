import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  test('deve renderizar a tela de login corretamente', () => {
    // Cenário: A tela de login é renderizada.
    render(<LoginScreen onLogin={() => {}} />);

    // Resultado Esperado: O título e a descrição da tela devem estar visíveis.
    expect(screen.getByRole('heading', { name: /acesse sua conta/i })).toBeInTheDocument();
    expect(screen.getByText(/entre ou cadastre-se para gerenciar seu legado digital/i)).toBeInTheDocument();
  });

  test('deve alternar para o formulário de cadastro e exibir o campo "Confirmar Senha"', async () => {
    // 1. Cenário: O usuário clica na aba de "Cadastro".
    render(<LoginScreen onLogin={() => {}} />);
    
    // Simula o clique na aba 'Cadastro'
    const registerTab = screen.getByRole('tab', { name: /cadastro/i });
    fireEvent.click(registerTab);

    // 2. Resultado Esperado: O campo de confirmação de senha deve aparecer na tela.
    // Usamos findBy para esperar que o elemento apareça.
    const confirmPasswordInput = await screen.findByLabelText(/confirmar senha/i);
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test('deve chamar a função onLogin ao clicar no botão "Entrar" com dados válidos', () => {
    // 1. Cenário: O usuário preenche os campos de login e clica em "Entrar".
    const mockOnLogin = jest.fn();
    render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    // 2. Resultado Esperado: A função de callback onLogin deve ser chamada.
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });
});
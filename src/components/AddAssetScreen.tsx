import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { CheckCircle, ExternalLink, GamepadIcon } from 'lucide-react';

interface AddAssetScreenProps {
  onNavigate: (screen: string) => void;
}

export function AddAssetScreen({ onNavigate }: AddAssetScreenProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const platforms = [
    { id: 'steam', name: 'Steam', status: 'connected', users: '1.3B+' },
    { id: 'playstation', name: 'PlayStation Network', status: 'connected', users: '110M+' },
    { id: 'xbox', name: 'Xbox Live', status: 'connected', users: '100M+' },
    { id: 'epic', name: 'Epic Games', status: 'available', users: '500M+' },
    { id: 'nintendo', name: 'Nintendo Switch', status: 'available', users: '125M+' },
    { id: 'battlenet', name: 'Battle.net', status: 'available', users: '50M+' },
    { id: 'origin', name: 'EA Origin', status: 'available', users: '30M+' },
    { id: 'uplay', name: 'Ubisoft Connect', status: 'available', users: '20M+' },
  ];

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !username) return;
    
    setIsConnecting(true);
    // Simulação de conexão
    setTimeout(() => {
      setIsConnecting(false);
      alert('Plataforma conectada com sucesso!');
      setSelectedPlatform('');
      setUsername('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Adicionar Ativo Digital</h1>
          <p className="text-muted-foreground">Conecte suas contas de jogos para preservar seu legado</p>
        </div>
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>
          Voltar ao Dashboard
        </Button>
      </div>

      {/* Plataformas Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Plataformas Disponíveis</CardTitle>
          <CardDescription>
            Selecione uma plataforma para conectar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <Card 
                key={platform.id} 
                className={`cursor-pointer transition-all ${
                  platform.status === 'connected' 
                    ? 'border-green-500 bg-green-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => {
                  if (platform.status === 'available') {
                    setSelectedPlatform(platform.id);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GamepadIcon className="w-5 h-5" />
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    {platform.status === 'connected' ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conectado
                      </Badge>
                    ) : (
                      <Badge variant="outline">Disponível</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {platform.users} usuários ativos
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Conexão */}
      {selectedPlatform && (
        <Card>
          <CardHeader>
            <CardTitle>
              Conectar {platforms.find(p => p.id === selectedPlatform)?.name}
            </CardTitle>
            <CardDescription>
              Insira suas credenciais para conectar esta plataforma ao seu legado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConnect} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Plataforma</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms
                      .filter(p => p.status === 'available')
                      .map(platform => (
                        <SelectItem key={platform.id} value={platform.id}>
                          {platform.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input
                  id="username"
                  placeholder="Seu nome de usuário na plataforma"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Conexão Segura</p>
                    <p className="text-blue-700">
                      Utilizamos OAuth 2.0 para conectar sua conta de forma segura. 
                      Suas credenciais não são armazenadas em nossos servidores.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isConnecting}
                  className="flex-1"
                >
                  {isConnecting ? 'Conectando...' : 'Conectar Conta'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setSelectedPlatform('');
                    setUsername('');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Guia de Conexão */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona a Conexão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</div>
            <div>
              <p className="font-medium">Selecione a Plataforma</p>
              <p className="text-sm text-muted-foreground">Escolha a plataforma de jogos que deseja conectar</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</div>
            <div>
              <p className="font-medium">Autorização Segura</p>
              <p className="text-sm text-muted-foreground">Você será redirecionado para autorizar o acesso de forma segura</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</div>
            <div>
              <p className="font-medium">Sincronização Automática</p>
              <p className="text-sm text-muted-foreground">Suas conquistas e dados são sincronizados automaticamente</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
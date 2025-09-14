import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { GamepadIcon, Users, Trophy, Heart, Plus } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Bem-vindo ao seu legado digital</h1>
          <p className="text-muted-foreground">Gerencie suas conquistas e memórias de jogos</p>
        </div>
        <Button onClick={() => onNavigate('addAsset')}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Ativo
        </Button>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plataformas Conectadas</CardTitle>
            <GamepadIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Steam, PlayStation, Xbox
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              87% completude média
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herdeiros</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Configurados e ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memórias</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Screenshots e vídeos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso do Legado */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso do Legado</CardTitle>
          <CardDescription>
            Complete a configuração do seu legado digital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Perfil Básico</span>
              <Badge variant="secondary">Completo</Badge>
            </div>
            <Progress value={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Contas Conectadas</span>
              <Badge variant="secondary">75%</Badge>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Herdeiros Configurados</span>
              <Badge variant="outline">Pendente</Badge>
            </div>
            <Progress value={50} />
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('addAsset')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamepadIcon className="w-5 h-5" />
              Conectar Nova Plataforma
            </CardTitle>
            <CardDescription>
              Adicione Steam, PlayStation, Xbox ou outras plataformas
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('legacyProfile')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Visualizar Perfil do Legado
            </CardTitle>
            <CardDescription>
              Veja como seu legado aparecerá para os herdeiros
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('heritageManagement')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gerenciar Herdeiros
            </CardTitle>
            <CardDescription>
              Configure permissões e adicione novos herdeiros
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Últimas Atividades */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Nova conquista desbloqueada em "The Witcher 3"</p>
                <p className="text-xs text-muted-foreground">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Conta PlayStation conectada com sucesso</p>
                <p className="text-xs text-muted-foreground">Ontem</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Novo herdeiro adicionado: Maria Silva</p>
                <p className="text-xs text-muted-foreground">3 dias atrás</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Plus, Mail, Edit, Trash2, Shield, Eye, Download, Share } from 'lucide-react';

interface HeritageManagementScreenProps {
  onNavigate: (screen: string) => void;
}

interface Heir {
  id: string;
  name: string;
  email: string;
  relationship: string;
  status: 'active' | 'pending' | 'suspended';
  permissions: {
    viewProfile: boolean;
    downloadMemories: boolean;
    shareContent: boolean;
    editProfile: boolean;
  };
  addedDate: string;
}

export function HeritageManagementScreen({ onNavigate }: HeritageManagementScreenProps) {
  const [isAddHeirOpen, setIsAddHeirOpen] = useState(false);
  const [newHeirName, setNewHeirName] = useState('');
  const [newHeirEmail, setNewHeirEmail] = useState('');
  const [newHeirRelationship, setNewHeirRelationship] = useState('');
  const [newHeirMessage, setNewHeirMessage] = useState('');

  const [heirs, setHeirs] = useState<Heir[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      relationship: 'Filha',
      status: 'active',
      permissions: {
        viewProfile: true,
        downloadMemories: true,
        shareContent: false,
        editProfile: false,
      },
      addedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Pedro Santos',
      email: 'pedro@email.com',
      relationship: 'Irmão',
      status: 'pending',
      permissions: {
        viewProfile: true,
        downloadMemories: false,
        shareContent: false,
        editProfile: false,
      },
      addedDate: '2024-01-20',
    },
  ]);

  const handleAddHeir = () => {
    if (!newHeirName || !newHeirEmail || !newHeirRelationship) return;

    const newHeir: Heir = {
      id: Date.now().toString(),
      name: newHeirName,
      email: newHeirEmail,
      relationship: newHeirRelationship,
      status: 'pending',
      permissions: {
        viewProfile: true,
        downloadMemories: false,
        shareContent: false,
        editProfile: false,
      },
      addedDate: new Date().toISOString().split('T')[0],
    };

    setHeirs([...heirs, newHeir]);
    setNewHeirName('');
    setNewHeirEmail('');
    setNewHeirRelationship('');
    setNewHeirMessage('');
    setIsAddHeirOpen(false);
  };

  const updateHeirPermission = (heirId: string, permission: keyof Heir['permissions'], value: boolean) => {
    setHeirs(heirs.map(heir => 
      heir.id === heirId 
        ? { ...heir, permissions: { ...heir.permissions, [permission]: value } }
        : heir
    ));
  };

  const removeHeir = (heirId: string) => {
    setHeirs(heirs.filter(heir => heir.id !== heirId));
  };

  const getStatusBadge = (status: Heir['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'pending':
        return <Badge variant="outline">Pendente</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspenso</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Gestão de Herdeiros</h1>
          <p className="text-muted-foreground">Gerencie quem terá acesso ao seu legado digital</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddHeirOpen} onOpenChange={setIsAddHeirOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Herdeiro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Herdeiro</DialogTitle>
                <DialogDescription>
                  Convide alguém para ter acesso ao seu legado digital
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heir-name">Nome Completo</Label>
                  <Input
                    id="heir-name"
                    placeholder="Ex: Maria Silva"
                    value={newHeirName}
                    onChange={(e) => setNewHeirName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heir-email">E-mail</Label>
                  <Input
                    id="heir-email"
                    type="email"
                    placeholder="maria@email.com"
                    value={newHeirEmail}
                    onChange={(e) => setNewHeirEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heir-relationship">Relacionamento</Label>
                  <Select value={newHeirRelationship} onValueChange={setNewHeirRelationship}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o relacionamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filho">Filho(a)</SelectItem>
                      <SelectItem value="conjuge">Cônjuge</SelectItem>
                      <SelectItem value="irmao">Irmão(ã)</SelectItem>
                      <SelectItem value="pai">Pai/Mãe</SelectItem>
                      <SelectItem value="amigo">Amigo(a)</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heir-message">Mensagem Personalizada (Opcional)</Label>
                  <Textarea
                    id="heir-message"
                    placeholder="Uma mensagem especial para este herdeiro..."
                    value={newHeirMessage}
                    onChange={(e) => setNewHeirMessage(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddHeirOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddHeir}>
                  Enviar Convite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Herdeiros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{heirs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {heirs.filter(h => h.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {heirs.filter(h => h.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Herdeiros */}
      <Card>
        <CardHeader>
          <CardTitle>Herdeiros Configurados</CardTitle>
          <CardDescription>
            Gerencie as permissões e acesso de cada herdeiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {heirs.map((heir) => (
              <Card key={heir.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder-avatar-${heir.id}.jpg`} />
                      <AvatarFallback>
                        {heir.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{heir.name}</h3>
                      <p className="text-sm text-muted-foreground">{heir.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(heir.status)}
                        <Badge variant="outline">{heir.relationship}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Adicionado em {heir.addedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeHeir(heir.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Permissões */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Permissões
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Ver Perfil</span>
                      </div>
                      <Switch
                        checked={heir.permissions.viewProfile}
                        onCheckedChange={(checked) => 
                          updateHeirPermission(heir.id, 'viewProfile', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Baixar Memórias</span>
                      </div>
                      <Switch
                        checked={heir.permissions.downloadMemories}
                        onCheckedChange={(checked) => 
                          updateHeirPermission(heir.id, 'downloadMemories', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Compartilhar</span>
                      </div>
                      <Switch
                        checked={heir.permissions.shareContent}
                        onCheckedChange={(checked) => 
                          updateHeirPermission(heir.id, 'shareContent', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Editar Perfil</span>
                      </div>
                      <Switch
                        checked={heir.permissions.editProfile}
                        onCheckedChange={(checked) => 
                          updateHeirPermission(heir.id, 'editProfile', checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Herança */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Herança</CardTitle>
          <CardDescription>
            Defina como e quando seu legado será ativado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Ativação Automática</p>
              <p className="text-sm text-muted-foreground">
                Ativar legado após período de inatividade
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificações aos Herdeiros</p>
              <p className="text-sm text-muted-foreground">
                Enviar atualizações regulares sobre o legado
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Backup Automático</p>
              <p className="text-sm text-muted-foreground">
                Criar backups regulares das memórias e conquistas
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
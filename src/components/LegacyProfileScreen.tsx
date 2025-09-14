import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, Calendar, GamepadIcon, Heart, Star, Clock } from 'lucide-react';

interface LegacyProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function LegacyProfileScreen({ onNavigate }: LegacyProfileScreenProps) {
  const achievements = [
    { game: 'The Witcher 3', name: 'Completionista', rarity: 'Lendária', date: '2024-01-15', icon: '🏆' },
    { game: 'Cyberpunk 2077', name: 'Herói de Night City', rarity: 'Épica', date: '2024-01-10', icon: '⭐' },
    { game: 'Elden Ring', name: 'Lorde Elden', rarity: 'Lendária', date: '2024-01-05', icon: '👑' },
    { game: 'God of War', name: 'Pai e Filho', rarity: 'Rara', date: '2023-12-20', icon: '💙' },
  ];

  const memories = [
    { type: 'screenshot', game: 'The Last of Us', description: 'Momento emocionante com Ellie', date: '2024-01-12' },
    { type: 'video', game: 'Red Dead Redemption 2', description: 'Pôr do sol épico em Valentine', date: '2024-01-08' },
    { type: 'screenshot', game: 'Ghost of Tsushima', description: 'Batalha samurai perfeita', date: '2024-01-03' },
  ];

  const gameStats = [
    { platform: 'Steam', games: 247, hours: '2,340h', achievements: 1247 },
    { platform: 'PlayStation', games: 89, hours: '890h', achievements: 456 },
    { platform: 'Xbox', games: 156, hours: '1,200h', achievements: 678 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Perfil do Legado</h1>
          <p className="text-muted-foreground">Como seu legado aparecerá para os herdeiros</p>
        </div>
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>
          Voltar ao Dashboard
        </Button>
      </div>

      {/* Header do Perfil */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">João Silva</h2>
              <p className="text-muted-foreground mb-4">
                Gamer apaixonado desde 1995. Especialista em RPGs e jogos de aventura. 
                "Os jogos nos conectam através do tempo e espaço."
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  Jogando desde 1995
                </Badge>
                <Badge variant="secondary">
                  <Trophy className="w-3 h-3 mr-1" />
                  2,381 Conquistas
                </Badge>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  4,430 Horas Jogadas
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="memories">Memórias</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="collection">Coleção</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Conquistas Mais Raras
              </CardTitle>
              <CardDescription>
                Suas conquistas mais difíceis e significativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-muted-foreground">{achievement.game}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          achievement.rarity === 'Lendária' ? 'default' :
                          achievement.rarity === 'Épica' ? 'secondary' : 'outline'
                        }
                      >
                        {achievement.rarity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Memórias Especiais
              </CardTitle>
              <CardDescription>
                Momentos marcantes e screenshots favoritos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memories.map((memory, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-4xl">
                        {memory.type === 'video' ? '🎥' : '📸'}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-1">{memory.game}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{memory.description}</p>
                      <p className="text-xs text-muted-foreground">{memory.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gameStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GamepadIcon className="w-5 h-5" />
                    {stat.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Jogos</span>
                      <span className="text-sm font-medium">{stat.games}</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tempo Jogado</span>
                      <span className="text-sm font-medium">{stat.hours}</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Conquistas</span>
                      <span className="text-sm font-medium">{stat.achievements}</span>
                    </div>
                    <Progress value={90} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Jogos Favoritos
              </CardTitle>
              <CardDescription>
                Uma curadoria especial dos jogos mais marcantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'The Witcher 3: Wild Hunt', year: '2015', rating: 5, hours: '120h' },
                  { name: 'Red Dead Redemption 2', year: '2018', rating: 5, hours: '85h' },
                  { name: 'The Last of Us Part II', year: '2020', rating: 4.5, hours: '25h' },
                  { name: 'God of War (2018)', year: '2018', rating: 5, hours: '35h' },
                ].map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{game.name}</p>
                      <p className="text-sm text-muted-foreground">{game.year} • {game.hours}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(game.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}